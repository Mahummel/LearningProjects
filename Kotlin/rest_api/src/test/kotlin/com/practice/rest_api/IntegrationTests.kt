package com.practice.rest_api

import org.assertj.core.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.AfterAll
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.web.client.getForEntity
import org.springframework.http.HttpStatus

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class IntegrationTests(@Autowired val restTemplate: TestRestTemplate) {

	@BeforeAll
	fun setup() {
		println(">> Setup")
	}

	@Test
	fun `Assert blog page title, content, and status code`() {
		println(">> Assert blog page title, content, and status code ")
		val entity = restTemplate.getForEntity<String>("/")
		assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
		assertThat(entity.body).contains("<h1>Blog</h1>", "First")
	}

	@Test
	fun `Assert article page title, fontent, and status code`() {
		println(">> Assert article page title, content, and status code ")
		val title = "First Blog post"
		val entity = restTemplate.getForEntity<String>("/article/${title.toSlug()}")
		assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
		assertThat(entity.body).contains(title, "the very first!", "Lorem Impsum")
	}

	@AfterAll
	fun teardown() {
		println(">> Tear Down")
	}

}
