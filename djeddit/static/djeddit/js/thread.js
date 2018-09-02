/**
 * Created by Roman on 12-Dec-16.
 */

window.postFuncs = {
  removePostForm: function (post) {
    $('#' + post + '>.bs-callout-main').next().remove()
  },
  togglePostForm: function (post, toggle, url) {
    url = urljoin(url, post)
    console.log(url)
    var $placeAfter = $('#' + post + '>.bs-callout-main')
    window.util.toggleForm(url, post, $placeAfter, {}, $(toggle))
  },
  toggleEditForm: function (post, toggle, toggleHeader) {
    var $placeAfter = $('#' + post + '>.bs-callout-main')
    $placeAfter.toggle()
    this.togglePostForm(post, toggle, window.THREAD_URLS['editPost'])
    if (toggleHeader) { $('.bs-callout-heading').toggle() }
  },
  votePost: function (element, post, upvoted, downvoted) {
    var vote = 0
    if (upvoted) { vote += 1 }
    if (downvoted) { vote -= 1 }
    var url = window.THREAD_URLS['votePost']
    var params = {post: post, vote: vote}
    console.log(url, params)
    $.post(url, params, function (data) {
      console.log(data)
      let parent = $(element).parent().parent().parent()
      // update arrow icons
      var $upvoteIcon = parent.find('.djeddit-score-upvote')
      var $downvoteIcon = parent.find('.djeddit-score-downvote')
      var $upvoteIconLarge = parent.find('.djeddit-score-upvote-large')
      var $downvoteIconLarge = parent.find('.djeddit-score-downvote-large')
      var $text = parent.find('.djeddit-score-number')
      var $textLarge = parent.find('.djeddit-score-number-large')

      if (vote === 1) {
        $upvoteIcon.addClass('color-primary')
        $upvoteIconLarge.addClass('color-primary')
        $text.addClass('color-upvote')
        $textLarge.addClass('color-upvote')
      } else {
        $upvoteIcon.removeClass('color-primary')
        $upvoteIconLarge.removeClass('color-primary')
        $text.removeClass('color-upvote')
        $textLarge.removeClass('color-upvote')
      }
      if (vote === -1) {
        $downvoteIcon.addClass('color-primary')
        $downvoteIconLarge.addClass('color-primary')
        $text.addClass('color-downvote')
        $textLarge.addClass('color-downvote')
      } else {
        $downvoteIcon.removeClass('color-primary')
        $downvoteIconLarge.removeClass('color-primary')
        $text.removeClass('color-downvote')
        $textLarge.removeClass('color-downvote')
      }
      // update post's displayed score
      $text.text(data.score)
      $textLarge.text(data.score)
    //   $post.find('>.bs-callout-main>.minicol>.post-score').text(data.score)
    })
  },
  toggleReplies: function (post) {
    var $icon = $('#' + post + '>.post-heading>.fa.toggle-replies')
    $icon.toggleClass('fa-minus-square-o')
    $icon.toggleClass('fa-plus-square-o')
    $('>.bs-callout-main', '#' + post).slideToggle('fast')
    $('.post-container', '#' + post).slideToggle('fast')
  },
  deletePost: function (post, show_confirm) {
    if (!show_confirm || confirm('This will permanently delete this thread and all related comments')) { window.location = urljoin(window.THREAD_URLS['deletePost'], post) }
  },
  getPostRepliesUids: function (post) {
    // get uids of shown replies to a given post
    var $baseElem = $('#comments-callout')
    if (post) { $baseElem = $baseElem.find('#' + post) }
    var $replies = $baseElem.find('.post-container')
    var $uids = $replies.map(function (i) {
      return $replies[i].id
    })
    return $uids.toArray()
  },
  loadAdditionalReplies: function ($elem, post, op) {
    // load missing replies for a given post into $elem
    var excluded = this.getPostRepliesUids(post)
    var url = window.THREAD_URLS['loadAdditionalReplies']
    var params = {post: post || op, excluded: JSON.stringify(excluded)}
    $.get(url, params, function (data) {
      $elem.replaceWith(data)

      // render new MathJax
      window.MathJax.Hub.Queue(['Typeset', MathJax.Hub])
    })
  },
  loginNeeded: function () {
    document.getElementById('login-signup-link').click()
  }
}
