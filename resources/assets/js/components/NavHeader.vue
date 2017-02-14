<template>

    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="">Canvas solutions</a>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><router-link to="/Grid">Grid</router-link></li>
                    <li><router-link to="/CanvasEngine">CanvasEngine</router-link></li>
                    <li><router-link to="/CanvasSignature">CanvasSignature</router-link></li>
                    <li><router-link to="/Movement">Movement</router-link></li>
                </ul>
            </div>
        </div>
    </nav>

</template>

<style>

    .router-link-active {
        background-color: #080808 !important;
        color: #fff !important;
    }

</style>

<script>

    export default { }

</script>