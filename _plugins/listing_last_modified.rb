# frozen_string_literal: true

# Listing pages (the homepage and the archive) change whenever a post is
# published or updated, but their own files rarely change. Without this,
# jekyll-last-modified-at dates them by their last git commit, so the
# sitemap reported the homepage as last modified months before the newest
# post it lists.
#
# Runs after jekyll-last-modified-at's post_init hook has assigned every
# page its git-derived date, and replaces it on listing pages with the
# newest post's last_modified_at (or its publish date when unset).
Jekyll::Hooks.register :site, :pre_render do |site|
  listing_urls = ["/", "/archive/"]
  newest = site.posts.docs.map { |post|
    modified = post.data["last_modified_at"]
    modified = modified.to_liquid if modified.respond_to?(:to_liquid)
    modified = Time.parse(modified.to_s) unless modified.is_a?(Time) || modified.is_a?(Date) || modified.nil?
    [modified, post.date].compact.map(&:to_time).max
  }.compact.max
  next unless newest

  site.pages.each do |page|
    page.data["last_modified_at"] = newest if listing_urls.include?(page.url)
  end
end
