<template>
  <QuillEditor
    :content="text"
    ref="myQuillEditor"
    theme="snow"
    content-type="html"
    toolbar="essential"
  >
  </QuillEditor>
</template>

<script>
// require styles
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  props: {
    text: String,
  },
  components: {
    QuillEditor,
  },
};
</script>

<style>
.ql-editor {
  min-height: inherit !important;
}
</style>
