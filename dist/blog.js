(function () {
  var posts = [
    {
      slug: "what-makes-authentic-bengali-cuisine-truly-authentic",
      title: "What Makes Authentic Bengali Cuisine Truly Authentic?",
      kicker: "Traditional Bengali Food",
      date: "February 12, 2026",
      readTime: "5 min read",
      image: "/img/img2.webp",
      imageAlt: "Authentic Bengali cuisine platter",
      excerpt:
        "Authentic Bengali cuisine is shaped by Bengal's geography, cultural traditions, and a distinctive balance of flavors, making it one of the most celebrated regional cuisines in India.",
      paragraphs: [
        "Authentic Bengali cuisine is shaped by Bengal's geography, cultural traditions, and a distinctive balance of flavors, making it one of the most celebrated regional cuisines in India.",
        "Deeply rooted in the river-rich landscape of Bengal, traditional Bengali food is built around rice and freshwater fish, along with seasonal vegetables and leafy greens.",
        "What defines authentic Bengali cuisine is its subtle use of spices, featuring mustard seeds, panch phoron, and the bold aroma of mustard oil to enhance natural flavors rather than overpower them.",
        "Time-honored Bengali cooking techniques such as slow cooking, steaming, and careful tempering help preserve taste, nutrition, and authenticity.",
        "Passed down through generations, traditional Bengali cuisine goes beyond recipes. It represents cultural identity, emotional heritage, and a timeless philosophy of simplicity, balance, and harmony in food."
      ]
    },
    {
      slug: "from-shorshe-ilish-to-kosha-mangsho-must-try-dishes-at-vojon-rosik",
      title: "From Shorshe Ilish to Kosha Mangsho: Must-Try Dishes at Vojon Rosik",
      kicker: "Signature Dishes",
      date: "February 12, 2026",
      readTime: "7 min read",
      image: "/img/img5.webp",
      imageAlt: "Shorshe Ilish and Bengali biryani style dish",
      excerpt:
        "If you're searching for an authentic Bengali restaurant near you, Vojon Rosik stands out as a destination for traditional Bengali cuisine prepared with care and authenticity.",
      paragraphs: [
        "If you're searching for an authentic Bengali restaurant near you, Vojon Rosik stands out as a destination for traditional Bengali cuisine prepared with care and authenticity.",
        "Known for its homestyle flavors and classic recipes, Vojon Rosik offers a menu that reflects the true taste of Bengal, making it a preferred choice for locals and visitors looking for genuine Bengali food.",
        "The highlight and signature dish at Vojon Rosik is Shorshe Ilish, one of the most iconic Bengali fish dishes. Made with premium hilsa fish, ground mustard seeds, and aromatic mustard oil, this dish delivers the bold yet balanced flavors that define authentic Bengali cuisine. For anyone searching online for Shorshe Ilish restaurant near me, Vojon Rosik is a must-visit.",
        "Another popular favorite is the Bengali-style Chicken Biryani, prepared with fragrant rice, tender chicken, and carefully balanced spices. Unlike overly spicy versions, this traditional chicken biryani focuses on aroma, texture, and depth of flavor, making it ideal for those seeking authentic Bengali biryani in a local restaurant setting.",
        "For meat lovers, Kosha Mangsho is one of the most ordered dishes at Vojon Rosik. This slow-cooked mutton curry is rich, deeply spiced, and cooked patiently to achieve its signature thick gravy. Often searched as best Kosha Mangsho near me, this dish perfectly represents classic Bengali non-vegetarian food.",
        "Whether you're craving authentic Bengali fish curry, traditional chicken biryani, or slow-cooked mutton dishes, Vojon Rosik offers a complete Bengali dining experience rooted in tradition. With its focus on local flavors, classic recipes, and comforting meals, Vojon Rosik continues to be a trusted choice for anyone looking for the best Bengali restaurant nearby."
      ]
    },
    {
      slug: "the-story-behind-vojon-rosik-our-love-for-authentic-bengali-food-in-kolkata",
      title: "The Story Behind Vojon Rosik: Our Love for Authentic Bengali Food in Kolkata",
      kicker: "Our Story",
      date: "February 12, 2026",
      readTime: "6 min read",
      image: "/img/img10.webp",
      imageAlt: "Vojon Rosik traditional Bengali food story",
      excerpt:
        "Vojon Rosik was founded with a simple yet heartfelt mission to bring authentic Bengali food in Kolkata closer to those who crave traditional flavors and homestyle cooking.",
      paragraphs: [
        "Vojon Rosik was founded with a simple yet heartfelt mission to bring authentic Bengali food in Kolkata closer to those who crave traditional flavors and homestyle cooking.",
        "Inspired by family kitchens and recipes passed down through generations, our journey began as a way to preserve the true essence of traditional Bengali cuisine while serving the local community. Today, Vojon Rosik is proud to be known as a trusted destination for authentic Bengali cuisine in Kolkata, where food tastes just like home.",
        "Our love for Bengali food is deeply rooted in Bengal's culinary heritage. At Vojon Rosik, we focus on classic elements such as rice, freshwater fish, seasonal vegetables, and slow-cooked meat dishes that define traditional Bengali food. We use mustard oil, mustard seeds, and time-honored spice combinations to enhance natural flavors, staying true to the soul of authentic Bengali cooking in Kolkata.",
        "What makes Vojon Rosik stand out among Bengali restaurants in Kolkata is our commitment to traditional cooking techniques. We believe real Bengali food takes time. Slow cooking, gentle tempering, and careful preparation are essential to achieving depth and balance of flavor. Every dish reflects patience, authenticity, and respect for Bengali food culture.",
        "More than just a restaurant, Vojon Rosik is a place where culture, memories, and flavors meet. Whether you are a local resident or someone searching online for the best Bengali restaurant in Kolkata, we invite you to experience food that celebrates tradition, emotion, and authenticity. Our story continues through every meal we serve, sharing our love for real Bengali food with the community of Kolkata."
      ]
    }
  ];

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderListPage() {
    var feed = document.getElementById("blogFeed");
    if (!feed) return;

    feed.innerHTML = posts
      .map(function (post) {
        return (
          '<article class="feed-card">' +
          '<img class="feed-image" src="' + post.image + '" alt="' + escapeHtml(post.imageAlt) + '" />' +
          '<div class="feed-copy">' +
          '<div class="feed-headline-row">' +
          '<p class="feed-kicker">' + escapeHtml(post.kicker) + "</p>" +
          '<p class="feed-date">' + escapeHtml(post.date) + "</p>" +
          "</div>" +
          "<h2>" + escapeHtml(post.title) + "</h2>" +
          "<p>" + escapeHtml(post.excerpt) + "</p>" +
          '<div class="feed-meta">' +
          '<span class="feed-read-time">' + escapeHtml(post.readTime) + "</span>" +
          '<a class="feed-link" href="blog-post.html?slug=' + encodeURIComponent(post.slug) + '">Read full post <i class="bi bi-arrow-right"></i></a>' +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderPostPage() {
    var postContainer = document.getElementById("blogPost");
    if (!postContainer) return;

    var params = new URLSearchParams(window.location.search);
    var slug = params.get("slug");
    var currentPost = posts.find(function (post) {
      return post.slug === slug;
    });

    if (!currentPost) {
      postContainer.innerHTML =
        '<div class="post-not-found">' +
        "<h2>Post not found</h2>" +
        '<p>The requested post does not exist. Please return to the blog list.</p>' +
        '<a class="post-back-link" href="blog.html"><i class="bi bi-arrow-left"></i> Back to blogs</a>' +
        "</div>";
      return;
    }

    document.title = currentPost.title + " | Vojon Rosik";

    var bodyHtml = currentPost.paragraphs
      .map(function (paragraph) {
        return "<p>" + escapeHtml(paragraph) + "</p>";
      })
      .join("");

    postContainer.innerHTML =
      '<img class="post-cover" src="' + currentPost.image + '" alt="' + escapeHtml(currentPost.imageAlt) + '" />' +
      '<div class="post-content">' +
      '<a class="post-back-link" href="blog.html"><i class="bi bi-arrow-left"></i> Back to blogs</a>' +
      '<p class="post-kicker">' + escapeHtml(currentPost.kicker) + "</p>" +
      '<h1 class="post-title">' + escapeHtml(currentPost.title) + "</h1>" +
      '<p class="post-meta">' + escapeHtml(currentPost.date) + " . " + escapeHtml(currentPost.readTime) + "</p>" +
      '<div class="post-body">' + bodyHtml + "</div>" +
      "</div>";

    var relatedContainer = document.getElementById("relatedPosts");
    if (!relatedContainer) return;

    relatedContainer.innerHTML = posts
      .filter(function (post) {
        return post.slug !== currentPost.slug;
      })
      .map(function (post) {
        return (
          '<a class="related-link" href="blog-post.html?slug=' + encodeURIComponent(post.slug) + '">' +
          "<strong>" + escapeHtml(post.title) + "</strong>" +
          "<span>" + escapeHtml(post.readTime) + "</span>" +
          "</a>"
        );
      })
      .join("");
  }

  renderListPage();
  renderPostPage();
})();
