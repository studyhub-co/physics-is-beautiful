Communication messages with iframe.

# Footer

Send and receive EventMessages from evaluation iframe (id='student_view_iframe'):

 * send 'edit_mode' (edit mode was enabled in editor)
 * send 'save_data' (save material data was clicked)
 * send 'check_user_reaction' (check button was clicked)
 * send 'continue' (continue button was clicked)

---
  * receive 'current_material' (material loaded inside iframe)
```javascript 
 {
  type: 'current_material',
  data: currentMaterial,
 }
```
 * receive 'disabled_check_button' (disable check/continue button)
```javascript
 {
  type: 'disabled_check_button',
  data: true,
 }
```

* receive 'user_reaction_state' (see src/README.md of studyhub eval lib)
```javascript 
 {
  type: 'user_reaction_state',
  data: { 
        state: 'checked',
        userLessonScore: 20,
        wasCorrect: true,
        },
 }
```
 
# Lesson

* receive 'material_problem_type_kind' (it's game or component, needs to manage footer on SPA)
(from sanbox-eval-project)
```javascript 
 {
  type: 'material_problem_type_kind',
  data: 'game'
 }
```

# User profile

 * receive 'get_user_profile' (request current user profile from parent)
```javascript
 {
  type: 'get_user_profile',
 }
```

 * send 'user_profile' (send (response) user profile)
 ```javascript
 {
  type: 'user_profile',
  data: userProfileObject,
 }
```

