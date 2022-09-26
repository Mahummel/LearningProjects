package com.practice.rest_api

import org.springframework.http.HttpStatus.*
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.server.ResponseStatusException

@Controller
class HtmlController(
    private val repository: ArticleRepository,
    private val properties: BlogProperties
) {

  @GetMapping("/")
  fun blog(model: Model): String {
    model["title"] = properties.title
    model["banner"] = properties.banner
    model["articles"] = repository.findAllByOrderByAddedAtDesc().map { it.render() }
    return "blog"
  }

  // {} notation used to indicate path vars, as seen in @PathVariable
  @GetMapping("/article/{slug}")
  fun article(@PathVariable slug: String, model: Model): String {
    // Each step checks for null, and continues if not null, else throws exception
    val article =
        repository.findBySlug(slug)?.render()
            ?: throw ResponseStatusException(NOT_FOUND, "This article does not exist")
    // If article, then set and return following
    model["title"] = article.title
    model["article"] = article
    return "article"
  }

  fun Article.render() = RenderArticle(slug, title, headline, content, author, addedAt.format())

  // Class dedicated to holding data from a database or other (hence data class)
  data class RenderArticle(
      val slug: String,
      val title: String,
      val headline: String,
      val content: String,
      val author: User,
      val addedAt: String
  )
}
