use image::png::PNGEncoder;
/// Image creation and file saving
use image::ColorType;
/// Allows use for complex numbers
use num::Complex;
use std::env;
use std::fs::File;
/// Allows for input from terminal and command line arguments
use std::str::FromStr;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() != 5 {
        // Error print line
        eprintln!("Usage: {} FILE PIXELS UPPERLEFT LOWERRIGHT", args[0]);
        eprintln!(
            "Example: {} mandel.png 1000x750 -1.20,0.35 -1,0.20",
            args[0]
        );
        std::process::exit(1);
    }
    let bounds = parse_pair(&args[2], 'x').expect("error parsing image dimensions");
    let upper_left = parse_complex(&args[3]).expect("Error parsing upper left corner point");
    let lower_right = parse_complex(&args[4]).expect("Error parsing lower right corner point");
    // vec! = Create a vector of size (second arg), and fill with (first arg)
    let mut pixels = vec![0; bounds.0 * bounds.1];
    // Passing &mut to an argument allows for mutation of the original, so pixels can now be overwritten by render.
    render(&mut pixels, bounds, upper_left, lower_right);

    write_image(&args[1], &pixels, bounds).expect("Error writing to PNG file")
}

/// Try to determine if 'c' is in the Mandelbrot set, using a limit of iterations
/// If 'c' is not a member, return the number of iterations it took to leave a circle of radius 2
/// Return none if 'c' never leaves the circle
fn escape_time(c: Complex<f64>, limit: usize) -> Option<usize> {
    let mut z = Complex { re: 0.0, im: 0.0 };
    for i in 0..limit {
        if z.norm_sqr() > 4.0 {
            return Some(i);
        }
        z = z * z + c;
    }

    None
}

/// Option enumeration definition: this is in std lib
/// enum Option<T> {
///     None,
///     Some(T),
/// }

/// Parsing a srting 's' as a coordinate pair like `"400x600"` or `"1.0 0.5"`.
/// 's' has form <left><sep><right> and must be ASCII characters
fn parse_pair<T: FromStr>(s: &str, separator: char) -> Option<(T, T)> {
    match s.find(separator) {
        // No separator returns Nothing
        None => None,
        // A found separator starts a new match
        Some(index) => {
            // Get arguments before separater and after
            match (T::from_str(&s[..index]), T::from_str(&s[index + 1..])) {
                // If both exist (Ok function) assign and return to l,r
                (Ok(l), Ok(r)) => Some((l, r)),
                // Otherwise return Nothing (err for either)
                _ => None,
            }
        }
    }
}

#[test]
fn test_parse_pair() {
    assert_eq!(parse_pair::<i32>("", ','), None);
    assert_eq!(parse_pair::<i32>("10,", ','), None);
    assert_eq!(parse_pair::<i32>(",10", ','), None);
    assert_eq!(parse_pair::<i32>("10,20", ','), Some((10, 20)));
    assert_eq!(parse_pair::<i32>("10,20xy", ','), None);
    assert_eq!(parse_pair::<f64>("0.5x", 'x'), None);
    assert_eq!(parse_pair::<f64>("0.5x1.5", 'x'), Some((0.5, 1.5)));
}

///Parse a pair of floating-point comma separated numbers as a complex number
fn parse_complex(s: &str) -> Option<Complex<f64>> {
    match parse_pair(s, ',') {
        Some((re, im)) => Some(Complex { re, im }),
        None => None,
    }
}

#[test]
fn test_parse_complex() {
    assert_eq!(
        parse_complex("1.25,-0.0625"),
        Some(Complex {
            re: 1.25,
            im: -0.0625
        })
    );
    assert_eq!(parse_complex(",-0.0625"), None)
}

/// Given the row and column of a pixel in output image,
/// return the corresponding point on the complex plane.
///
/// 'bounds' is a pair giving the width and height of the image in pixels.
/// 'pixel' is a (column, row) pair indicating a particular pixel in that image.
/// the 'upper_left' and 'lower_left' parameters are points on the complex
/// plane designating the area our image covers

fn pixel_to_point(
    bounds: (usize, usize),
    pixel: (usize, usize),
    upper_left: Complex<f64>,
    lower_right: Complex<f64>,
) -> Complex<f64> {
    let (width, height) = (
        lower_right.re - upper_left.re,
        upper_left.im - lower_right.im,
    );
    Complex {
        // pixel.0 refers to the first item in the pixel tuple (much like pixel[0])
        re: upper_left.re + pixel.0 as f64 * width / bounds.0 as f64,
        im: upper_left.im - pixel.1 as f64 * height / bounds.1 as f64,
    }
}

#[test]
fn test_pixel_to_point() {
    assert_eq!(
        pixel_to_point(
            (100, 200),
            (25, 175),
            Complex { re: -1.0, im: 1.0 },
            Complex { re: 1.0, im: -1.0 }
        ),
        Complex {
            re: -0.5,
            im: -0.75
        }
    );
}

/// Render a rectangle of the Mandelbro set into a buffer of pixels
/// the 'bounds' arguments geives the width and height of the buffer 'pixels'
/// which holes one grayscale pixel per byte.
/// The 'upper_left' and 'lower_left' args sepcify points on the complex plane
/// corresponding to the upper-left, and lower-right corners of the pixel buffer
fn render(
    pixels: &mut [u8],
    bounds: (usize, usize),
    upper_left: Complex<f64>,
    lower_right: Complex<f64>,
) {
    // Make sure amount of pixels fits within boundaries given
    assert!(pixels.len() == bounds.0 * bounds.1);
    for row in 0..bounds.1 {
        for column in 0..bounds.0 {
            // create a point for each segment of the graph using previous function
            let point = pixel_to_point(bounds, (column, row), upper_left, lower_right);
            // assign pixel to its corresponding section, with the value of is/isnot in Mandelbrot set
            pixels[row * bounds.0 + column] = match escape_time(point, 255) {
                None => 0,
                Some(count) => 255 - count as u8,
            };
        }
    }
}

/// Write the buffer 'pixels' whose dimensions are given by 'bounds' to the file name: 'filename'
fn write_image(
    filename: &str,
    pixels: &[u8],
    bounds: (usize, usize),
    // std::io::Error is the other return type, becase both File::create and encoder error with this type.
) -> Result<(), std::io::Error> {
    // ? operator tells us at this point return with an error if unable to perform operation (which is one of our return types)
    // the output written with ? is exactly the same as the below code snippit
    // let output = match File::create(filename) {
    //     Ok(f) => f,
    //     Err(e) => {
    //         return Err(e);
    //     }
    // };
    let output = File::create(filename)?;

    let encoder = PNGEncoder::new(output);
    encoder.encode(
        &pixels,
        bounds.0 as u32,
        bounds.1 as u32,
        // Gray(8) indicates each byte is an 8 bit grayscale value
        ColorType::Gray(8),
    )?;
    Ok(())
}
