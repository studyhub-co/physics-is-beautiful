Components folder for Courses (student) view.

# Footer

Send and recieve EventMessages from evaluation iframe (id='student_view_iframe'):

 * send 'edit_mode' (edit mode was enabled in editor)
 * send 'save_data' (save material data was clicked)

---
  * recieve 'current_material' (material loaded inside iframe)
```javascript 
 {
  type: 'current_material',
  data: currentMaterial,
 }
```
 * recieve 'disabled_check_button' (disable check/continue button)
```javascript
 {
  type: 'disabled_check_button',
  data: true,
 }
```

* recieve 'user_reaction_state' (see src/README.md of studyhub eval lib)
```javascript 
 {
  type: 'user_reaction_state',
  data: 'checked',
 }
``` 
