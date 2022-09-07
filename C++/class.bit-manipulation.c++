class Bit {
  public: 
    int reapeatedShift(int x, int count) {
      for (int i = 0; i < count; i++) {
        x >>= 1;
      }
      return x;
    };
    bool getBit(int num, int i) {
      return ((num & (1 << i)) != 0);
    };
    bool setBit(int num, int i) {
      return num | (1 << i);
    };
    int clearBit(int num, int i) {
      int mask = ~(1 << i);
      return num & mask;
    };
    int updateBit(int num, int i, bool bitIs1) {
      int value = bitIs1 ? 1 : 0;
      int mask = ~(1 << i);
      return (num & mask) | (value << i);
    };
 };

int main(int argc, char const *argv[])
{
  /* code */
  Bit myBit;
  myBit.setBit(1, 3);
  myBit.getBit(1, 1);
  return 0;
}
