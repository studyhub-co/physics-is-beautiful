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
      let parent = $(element).parent()
      // update arrow icons
      var $upvoteIcon = parent.find('.djeddit-score-upvote')
      var $downvoteIcon = parent.find('.djeddit-score-downvote')
      if (vote === 1) { $upvoteIcon.addClass('color-primary') } else { $upvoteIcon.removeClass('color-primary') }
      if (vote === -1) { $downvoteIcon.addClass('color-primary') } else { $downvoteIcon.removeClass('color-primary') }
      // update post's displayed score
      parent.find('.djeddit-score-number').text(data.score)
    //   $post.find('>.bs-callout-main>.minicol>.post-score').text(data.score)
    })
  },
  loginNeeded: function () {
    document.getElementById('login-signup-link').click()
  }
}
