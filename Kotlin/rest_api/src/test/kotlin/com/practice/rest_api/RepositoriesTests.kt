package com.practice.rest_api

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager
import org.springframework.data.repository.findByIdOrNull

@DataJpaTest
class RepositoriesTests
@Autowired
constructor(
    val entityManager: TestEntityManager,
    val userRepository: UserRepository,
    val articleRepository: ArticleRepository
) {

  @Test
  fun `When findByIdOrNull then return Article`() {
    val michael = User("Mahummel", "Michael", "InsertLastNameHere")
    // Caches an insertion into dummy "DB"
    entityManager.persist(michael)
    val article = Article("Running a SpringBoot App", "How to:", "Lorem ipsum", michael)
    entityManager.persist(article)
    // Flush executes the two persist insertions immediately and flushes cache
    entityManager.flush()
    // Kotlin extension that returns null value on failure, !! operator asserts NPE
    val found = articleRepository.findByIdOrNull(article.id!!)
    assertThat(found).isEqualTo(article)
  }

  @Test
  fun `When findByLogin then return User`() {
    val michael = User("Mahummel", "Michael", "InsertLastNameHere")
    entityManager.persist(michael)
    entityManager.flush()
    val user = userRepository.findByLogin(michael.login)
    assertThat(user).isEqualTo(michael)
  }
}
