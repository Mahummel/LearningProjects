package com.practice.rest_api

import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.boot.context.properties.EnableConfigurationProperties

@WebMvcTest
class HttpControllersTest(@Autowired val mockMvc: MockMvc) {
  @MockkBean
  private lateinit var userRepository: UserRepository

  @MockkBean
  private lateinit var articleRepository: ArticleRepository

  @Test
  fun `List Articles`() {
    val michael = User("Mahummel", "Michael", "LastNameHere")
    val articleOne = Article("First Article", "This is the first!", "Lorem Ipsum", michael)
    val articleTwo = Article("Second Article", "This is the second!", "Lorem Ipsum", michael)
    every { articleRepository.findAllByOrderByAddedAtDesc() } returns listOf(articleOne, articleTwo)
    mockMvc.perform(get("/api/article/").accept(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk)
      .andExpect(content().contentType(MediaType.APPLICATION_JSON))
      .andExpect(jsonPath("\$.[0].author.login").value(michael.login))
      .andExpect(jsonPath("\$.[0].slug").value(articleOne.slug))
      .andExpect(jsonPath("\$.[1].author.login").value(michael.login))
      .andExpect(jsonPath("\$.[1].slug").value(articleTwo.slug))
  }

  @Test
  fun `List Users` () {
    val michael = User("Mahummel", "Michael", "LastNameHere")
    val matthew = User("Mthummel", "Matthew", "LastNameHere")
    every { userRepository.findAll() } returns listOf(michael, matthew)
    mockMvc.perform(get("/api/user/").accept(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk)
      .andExpect(content().contentType(MediaType.APPLICATION_JSON))
      .andExpect(jsonPath("\$.[0].login").value(michael.login))
      .andExpect(jsonPath("\$.[1].login").value(matthew.login))
  }
}