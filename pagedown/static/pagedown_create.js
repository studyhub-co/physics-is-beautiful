// var DjangoPagedown = DjangoPagedown | {}

function DjangoPagedownClass () {
  this.converter = {}
  this.elements = {}
  this.editors = {}
  this.isPagedownable = function (el) {
    if ((' ' + el.className + ' ').indexOf(' wmd-input ') > -1) {
      return true
    }
    return false
  }

  this.createEditor = function createEditor (el) {
    if (this.isPagedownable(el)) {
      if (this.editors.hasOwnProperty(el.id)) {
        this.destroyEditor(el)
      }

      if (!this.editors.hasOwnProperty(el.id)) {
        var selectors = {
          input: el.id,
          button: el.id + '_wmd_button_bar',
          preview: el.id + '_wmd_preview'
        }
        this.editors[el.id] = new Markdown.Editor(this.converter, '', selectors)
        this.editors[el.id].run()
        return true
      } else {
        console.log('Pagedown editor already attached to element: <#' + el.id + '>')
      }
    }
    return false
  }

  this.destroyEditor = function (el) {
    if (this.editors.hasOwnProperty(el.id)) {
      delete this.editors[el.id]
      return true
    }
    return false
  }

  this.init = function (textareaId) {
    this['converter'] = Markdown.getSanitizingConverter()
    Markdown.Extra.init(this.converter, {
      extensions: 'all'
    })
    if (textareaId) {
      var el = document.getElementById(textareaId)
      // if (isPagedownable(el)) { // no need, already in createEditor
      this.createEditor(el)
      // }
    } else {
      this.elements = document.getElementsByTagName('textarea')
      this.editors = {}
      for (var i = 0; i < this.elements.length; ++i) {
        if (isPagedownable(this.elements[i])) {
          this.createEditor(this.elements[i])
        }
      }
    }
  }

  // return {
  //   init: function (textareaId) {
  //     return init(textareaId)
  //   },
  //   createEditor: function (el) {
  //     return createEditor(el)
  //   },
  //   destroyEditor: function (el) {
  //     return destroyEditor(el)
  //   }
  // }
}

var DjangoPagedown = new DjangoPagedownClass()
