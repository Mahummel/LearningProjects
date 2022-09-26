package com.practice.rest_api

import org.springframework.boot.context.properties.ConstructorBinding
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.Banner

@ConstructorBinding
@ConfigurationProperties("blog")
data class BlogProperties(var title: String, val banner: Banner) {
  data class Banner(val title: String? = null, val content: String)
}