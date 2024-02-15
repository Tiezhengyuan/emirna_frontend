<template>
<div scoped>

<b-form inline> 
    <b-form-input placeholder="Surname"/>
    <b-form-input placeholder="Surname"/>
    <button>ddd</button>
</b-form>

<b-row>
  <b-col>
    label
</b-col>
  <b-col><b-form-input placeholder="Surname"/></b-col>
</b-row>


<div>
  <div>
    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      content-cols-sm
      content-cols-lg="7"
      description="Let us know your name."
      label="Enter your name"
      label-for="input-horizontal"
    >
      <b-form-input id="input-horizontal"></b-form-input>
    </b-form-group>
  </div>
</div>

</div>
</template>

<script>
export default {
    name: "BasicInput",
}
</script>