/** Visitor-facing blog copy — no CMS or implementation details in the UI. */

export const blogMsgs = {
  articlesUnavailableTitle: "Articles are unavailable right now",
  articlesUnavailableBody: "Please check back soon. If you need help in the meantime, use the contact options in the header or footer.",

  listLoadError: "We could not load the articles. Please try again in a moment.",

  emptyListBody:
    "We are preparing guides and resources for students and families. New articles will appear here when they go live.",

  articleUnavailableBody:
    "This article cannot be shown right now. You can return to the blog home or try again in a moment.",

  categoryUnavailableBody:
    "This part of the blog cannot be shown right now. Please try again later or return to the blog home.",

  categoryLoadError: "We could not load posts for this topic. Please try again in a moment.",

  emptyCategoryBody: "There are no published articles in this topic yet. Please check back later.",

  articleLoadError: "We could not load this article. Please try again in a moment.",
} as const;
