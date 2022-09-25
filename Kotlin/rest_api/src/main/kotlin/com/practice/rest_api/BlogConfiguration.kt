package com.practice.rest_api

import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

// Indicates class can be used for spring container for bean definitions
@Configuration
class BlogConfiguration {

  @Bean
  fun databaseInitializer(userRepository: UserRepository, articleRepository: ArticleRepository) =
      ApplicationRunner {
        val michael = userRepository.save(User("Mahummel", "Michael", "InsertLastName"))
        articleRepository.save(
            Article(
                title = "First Blog post",
                headline = "the very first!",
                content = "Lorem Impsum",
                author = michael
            )
        )
        articleRepository.save(
            Article(
                title = "Second Blog post",
                headline = "Not as cool as the first",
                content = "Lorem Impsum",
                author = michael
            )
        )
      }
}
