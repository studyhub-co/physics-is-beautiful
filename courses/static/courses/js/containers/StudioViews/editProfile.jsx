import React from 'react'

import PropTypes from 'prop-types'
import Moment from 'react-moment'
import ReactCrop from 'react-image-crop'
import { connect } from 'react-redux'
import { FaPencilAlt, FaChevronLeft } from 'react-icons/fa'

import history from '../../history'
import { Image as ImageBs, Container, Row, Col } from 'react-bootstrap'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import {
  changeCourseCoverPhoto,
  changeCourseImage,
  loadCourseIfNeeded,
  renameCourse,
  saveCourseDescription,
} from '../../actions/studio'

// import { EditableExternalEventLabel } from '../../components/label'
import { EditableExternalEventLabel } from '../../components/editableLabel'
import PencilImageUpload from '../../components/imageUploadPencil'
import DeleteIcon from '../../components/deleteIcon'
import EditCourseSettingsView from './editSettings'

function makeblob(dataURL, filename) {
  var BASE64_MARKER = ';base64,'
  var parts
  var contentType
  var raw
  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    parts = dataURL.split(',')
    contentType = parts[0].split(':')[1]
    raw = decodeURIComponent(parts[1])
    return new Blob([raw], { type: contentType })
  }
  parts = dataURL.split(BASE64_MARKER)
  contentType = parts[0].split(':')[1]
  raw = window.atob(parts[1])
  var rawLength = raw.length

  var uInt8Array = new Uint8Array(rawLength)

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  var blobdata = new Blob([uInt8Array], { type: contentType })

  blobdata.filename = filename

  return blobdata
}

// /**
//  * @param {File} image - Image File Object
//  * @param {Object} pixelCrop - pixelCrop Object provided by react-image-crop
//  * pixelCrop should be with unit = px (it's return with onCropComplete function as argument)
//  *
//  */
// function getCroppedImg(image, pixelCrop, type) {
//   const canvas = document.createElement('canvas')
//   canvas.width = pixelCrop.width
//   canvas.height = pixelCrop.height
//   const ctx = canvas.getContext('2d')
//
//   ctx.drawImage(
//     image,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height,
//   )
//
//   // As Base64 string
//   const base64Image = canvas.toDataURL(type)
//   return base64Image
// }

/**
 * @param {File} image - Image File Object
 * @param {Object} pixelCrop - pixelCrop Object provided by react-image-crop
 * pixelCrop should be with unit = px (it's return with onCropComplete function as argument)
 *
 */
function getCroppedImg(image, crop) {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  )

  const base64Image = canvas.toDataURL('image/jpeg')

  return base64Image
}

class EditCourseProfileView extends React.Component {
  constructor(props) {
    super(props)

    this.handleSelectTab = this.handleSelectTab.bind(this)
    this.startCourse = this.startCourse.bind(this)
    this.imageUpload = this.imageUpload.bind(this)
    this.coverPhotoSelected = this.coverPhotoSelected.bind(this)
    this.editNameClick = this.editNameClick.bind(this)
    this.editDescriptionClick = this.editDescriptionClick.bind(this)
    this.onNameChanged = this.onNameChanged.bind(this)
    this.onDescriptionChanged = this.onDescriptionChanged.bind(this)
    this.onCropChange = this.onCropChange.bind(this)
    this.onCropComplete = this.onCropComplete.bind(this)
    this.saveCroppedPhoto = this.saveCroppedPhoto.bind(this)
    this.onCoverImageLoaded = this.onCoverImageLoaded.bind(this)
    this.viewProfile = this.viewProfile.bind(this)
    this.deleteCoverPhoto = this.deleteCoverPhoto.bind(this)
    this.deleteCourseImage = this.deleteCourseImage.bind(this)

    this.state = {
      selectedTab: 'profile',
      croppingCoverPhotoMode: false,
      imgToCrop: false,
      // imgToCropBlob: null,
      file: null,
      cropInfo: null, // pixel version
      crop: {
        aspect: 2.7 / 1,
        // x: 27,
        // y: 10,
        unit: '%',
        width: 80,
      },
    }
  }

  componentDidMount() {
    this.props.loadCourse(this.props.match.params.uuid)
  }

  handleSelectTab(tabname, tabspace) {
    if (tabname === 'edit') {
      history.push(
        '/studio/editor/courses/' + this.props.match.params.uuid + '/',
      )
    }
    if (tabname !== this.state.tabname) {
      this.setState({ selectedTab: tabname })
    }
  }

  startCourse() {
    // window.open('/course/' + this.props.match.params.uuid + '/', '_self')
    history.push('/courses/' + this.props.match.params.uuid + '/')
  }

  viewProfile() {
    history.push(`/courses/${this.props.match.params.uuid}/profile/`)
  }

  // ==== description
  editDescriptionClick() {
    this.setState({ descriptionEditMode: true })
  }

  onDescriptionChanged(text) {
    this.props.onDescriptionChange(this.props.match.params.uuid, text)
    this.setState({ descriptionEditMode: false })
  }

  // ==== Name
  editNameClick() {
    this.setState({ nameEditMode: true })
  }

  onNameChanged(name) {
    this.props.onNameChange(this.props.match.params.uuid, name)
    this.setState({ nameEditMode: false })
  }

  //  ==== Image
  imageUpload(image) {
    if (image) {
      this.props.changeCourseImage(this.props.match.params.uuid, image)
    }
  }

  //  ==== Cover photo
  onCropChange(crop) {
    this.setState({ crop })
  }

  coverPhotoSelected(image) {
    if (image) {
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        // this.setState({ src: reader.result })
        this.setState({
          // imgToCropBlob: URL.createObjectURL(image),
          file: image,
          imgToCrop: reader.result,
          croppingCoverPhotoMode: true,
        }),
      )
      reader.readAsDataURL(image)
    }
  }

  saveCroppedPhoto() {
    if (this.state.cropInfo) {
      // var img = new Image()
      // img.src = this.state.imgToCropBlob

      const img = this.imageRef

      this.props.changeCourseCoverPhoto(
        this.props.match.params.uuid,
        makeblob(
          getCroppedImg(img, this.state.cropInfo, this.state.file.type),
          this.state.file.name,
        ),
      )
      this.setState({ croppingCoverPhotoMode: false })
    }
  }

  // onCropComplete(crop, pixelCrop) {
  onCropComplete(pixelCrop) {
    // if (crop.width !== 0) {
    if (pixelCrop.width !== 0) {
      this.setState({
        cropInfo: pixelCrop,
      })
    } else {
      this.setState({
        cropInfo: null,
      })
    }
  }

  onCoverImageLoaded(image) {
    this.imageRef = image
  }

  deleteCoverPhoto() {
    if (
      window.confirm('This will permanently delete cover photo. Are you sure?')
    ) {
      this.props.changeCourseCoverPhoto(this.props.match.params.uuid, null)
    }
  }

  deleteCourseImage() {
    if (
      window.confirm('This will permanently delete course image. Are you sure?')
    ) {
      this.props.changeCourseImage(this.props.match.params.uuid, null)
    }
  }

  render() {
    var selectedCourse = this.props.courses[this.props.match.params.uuid]

    if (!selectedCourse) return null

    return (
      <div className={'pop-up-window'}>
        <a
          className={'back-button'}
          onClick={() => {
            history.push('/studio/')
          }}
        >
          <FaChevronLeft />
          My courses
        </a>
        <Tabs
          name="editCourseProfileTabs"
          className="tabs"
          handleSelect={this.handleSelectTab}
          selectedTab={this.state.selectedTab}
        >
          <div className="tab-links">
            <TabLink to="profile">Course profile</TabLink>
            <TabLink to="settings">Course settings</TabLink>
            <TabLink to="edit">Edit content</TabLink>
          </div>
          <div className="content">
            <TabContent for="profile">
              {/* Todo move the tab content to a new component */}
              <Container fluid>
                <Row style={{ padding: 0 }}>
                  <Col
                    sm={12}
                    md={12}
                    style={{
                      padding: 0,
                      // ratio should be 2.7 / 1 (!)
                      // height: '25vw', // height of the cover
                      // width: '67.5vw', // width  of the cover
                      // maxHeight: '25vw', // height of the cover
                      // maxWidth: '67.5vw', // width  of the cover
                      height:
                        selectedCourse.cover_photo ||
                        this.state.croppingCoverPhotoMode
                          ? ''
                          : '30vw', // height of the cover
                      width:
                        selectedCourse.cover_photo ||
                        this.state.croppingCoverPhotoMode
                          ? ''
                          : '81vw', // width  of the cover
                      maxHeight:
                        selectedCourse.cover_photo ||
                        this.state.croppingCoverPhotoMode
                          ? ''
                          : '30vw',
                      maxWidth:
                        selectedCourse.cover_photo ||
                        this.state.croppingCoverPhotoMode
                          ? ''
                          : '81vw',
                      // overflow: 'hidden',
                      // position: 'relative',
                      backgroundColor:
                        selectedCourse.cover_photo ||
                        this.state.croppingCoverPhotoMode
                          ? ''
                          : '#9bdbf8', // background
                    }}
                  >
                    {/*<div*/}
                    {/*// style={{*/}
                    {/*//   position: 'absolute',*/}
                    {/*//   top: '0',*/}
                    {/*//   left: '0',*/}
                    {/*//   bottom: '0',*/}
                    {/*//   right: '0',*/}
                    {/*// }}*/}
                    {/*>*/}
                    <div
                      style={{
                        height: '100%',
                        position: this.state.croppingCoverPhotoMode
                          ? 'relative'
                          : '',
                      }}
                    >
                      {/* management buttons */}
                      <div
                        style={{
                          zIndex: 999,
                          position: 'absolute',
                          top: '1rem',
                        }}
                      >
                        {this.state.cropInfo &&
                          this.state.croppingCoverPhotoMode && (
                            <button
                              className={'editor-common-button'}
                              style={{
                                // position: 'absolute',
                                // top: '3rem',
                                zIndex: 999,
                                // left: '2rem',
                                // top: '85%',
                                // left: '2rem',
                              }}
                              onClick={this.saveCroppedPhoto}
                            >
                              Save photo
                            </button>
                          )}
                        <PencilImageUpload
                          labelText={
                            selectedCourse.cover_photo ||
                            this.state.croppingCoverPhotoMode
                              ? ''
                              : 'Select cover photo'
                          }
                          onFileSelect={this.coverPhotoSelected}
                        />
                        {selectedCourse.cover_photo &&
                          !this.state.croppingCoverPhotoMode && (
                            <DeleteIcon
                              onClick={this.deleteCoverPhoto}
                            ></DeleteIcon>
                          )}
                      </div>
                      {this.state.croppingCoverPhotoMode ? (
                        <div>
                          <ReactCrop
                            // src={this.state.imgToCropBlob}
                            src={this.state.imgToCrop}
                            crop={this.state.crop}
                            onImageLoaded={this.onCoverImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                          />
                        </div>
                      ) : (
                        <React.Fragment>
                          {selectedCourse.cover_photo && (
                            <ImageBs
                              src={`${
                                selectedCourse.cover_photo
                              }?${new Date().getTime()}`}
                              style={{ objectFit: 'cover', height: '100%' }}
                              fluid
                            />
                          )}
                        </React.Fragment>
                      )}
                      {/*</div>*/}
                    </div>
                  </Col>
                </Row>
                <br />
                <Row style={{ padding: 0 }}>
                  <Col sm={12} md={2} style={{ padding: 0 }}>
                    <div style={{ minHeight: '10rem' }}>
                      {selectedCourse.image ? (
                        <ImageBs
                          src={`${
                            selectedCourse.image
                          }?${new Date().getTime()}`}
                          fluid
                        />
                      ) : null}
                    </div>
                    <div
                      style={{
                        zIndex: 999,
                        position: 'absolute',
                        top: '1rem',
                      }}
                    >
                      <PencilImageUpload
                        labelText={
                          selectedCourse.image ? '' : 'Click to add image'
                        }
                        onFileSelect={this.imageUpload}
                      />
                      {selectedCourse.image && (
                        <DeleteIcon
                          onClick={this.deleteCourseImage}
                        ></DeleteIcon>
                      )}
                    </div>
                  </Col>
                  <Col sm={7} md={7}>
                    <Row style={{ padding: 0 }}>
                      <Col sm={12} md={12}>
                        <div className={'blue-title'}>
                          <EditableExternalEventLabel
                            value={selectedCourse.name}
                            onChange={this.onNameChanged}
                            editMode={this.state.nameEditMode}
                          />
                          <span
                            style={{
                              position: 'relative',
                              paddingLeft: '1rem',
                            }}
                          >
                            <span className={'base-circle-edit'}>
                              <FaPencilAlt
                                onClick={this.editNameClick}
                                style={{
                                  fontSize: '1.5rem',
                                  marginBottom: '0.75rem',
                                }}
                              />
                            </span>
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <Row style={{ padding: 0 }}>
                      <Col sm={12} md={12}>
                        <div style={{ fontSize: '2rem' }}>
                          {selectedCourse.author.display_name}∙{' '}
                          {selectedCourse.count_lessons} lessons ∙{' '}
                          {selectedCourse.number_of_learners} learners
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} md={12}>
                        <div style={{ color: 'gray' }}>
                          Created{' '}
                          <Moment fromNow>{selectedCourse.created_on}</Moment>∙
                          Last updated{' '}
                          <Moment fromNow>{selectedCourse.updated_on}</Moment>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={12} md={3}>
                    <button
                      className={'editor-common-button'}
                      onClick={this.startCourse}
                    >
                      Start Course
                    </button>
                    <button
                      className={'editor-common-button'}
                      onClick={this.viewProfile}
                    >
                      Profile view
                    </button>
                  </Col>
                </Row>
                <Row style={{ padding: '2rem 0' }}>
                  <Col sm={12} md={12} style={{ padding: 0 }}>
                    <EditableExternalEventLabel
                      textArea={Boolean(true)}
                      value={selectedCourse.description}
                      onChange={this.onDescriptionChanged}
                      editMode={this.state.descriptionEditMode}
                    />
                    {!selectedCourse.description && (
                      <span style={{ marginRight: '1rem' }}>
                        Click to add description:
                      </span>
                    )}
                    <span style={{ position: 'relative' }}>
                      <span className={'base-circle-edit'}>
                        <FaPencilAlt
                          onClick={this.editDescriptionClick}
                          style={{ fontSize: '1.5rem', marginTop: '0.75rem' }}
                        />
                      </span>
                    </span>
                  </Col>
                </Row>
              </Container>
            </TabContent>
            <TabContent for="settings">
              <EditCourseSettingsView course={selectedCourse} />
            </TabContent>
            <TabContent for="edit" />
          </div>
        </Tabs>
      </div>
    )
  }
}

EditCourseProfileView.propTypes = {
  // actions
  loadCourse: PropTypes.func.isRequired,
  changeCourseImage: PropTypes.func.isRequired,
  changeCourseCoverPhoto: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  // data
  courses: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    courses: state.studio.courses,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    loadCourse: uuid => dispatch(loadCourseIfNeeded(uuid)),
    changeCourseImage: (uuid, image) =>
      dispatch(changeCourseImage(uuid, image)),
    onNameChange: (uuid, name) => dispatch(renameCourse(uuid, name)),
    onDescriptionChange: (uuid, text) =>
      dispatch(saveCourseDescription(uuid, text)),
    changeCourseCoverPhoto: (uuid, image) =>
      dispatch(changeCourseCoverPhoto(uuid, image)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditCourseProfileView)
export { EditCourseProfileView as EditCourseProfileViewNotConnected }
