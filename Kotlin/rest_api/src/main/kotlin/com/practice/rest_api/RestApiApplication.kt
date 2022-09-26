package com.practice.rest_api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.Banner
import org.springframework.boot.context.properties.EnableConfigurationProperties

@SpringBootApplication
@EnableConfigurationProperties(BlogProperties::class)
class RestApiApplication

fun main(args: Array<String>) {
	runApplication<RestApiApplication>(*args) {
		setBannerMode(Banner.Mode.OFF)
	}
}
