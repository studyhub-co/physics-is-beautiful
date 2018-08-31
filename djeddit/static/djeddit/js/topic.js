/**
 * Created by Roman on 11-Jun-17.
 */

window.topicFuncs = {
  deleteTopic: function (topic_title) {
    if (confirm('This will permanently delete this topic and all related threads')) {
      window.location = window.TOPIC_URLS['deleteTopic']
    }
  },
  votePost: function (element, post, upvoted, downvoted, url) {
    console.log(upvoted, downvoted)
    var vote = 0
    if (upvoted) { vote += 1 }
    if (downvoted) { vote -= 1 }
    // var url = window.THREAD_URLS['votePost']
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
  loginNeeded: function () {
    document.getElementById('login-signup-link').click()
  }
}
