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
                    <li :class="{ 'active': activePage == 'Grid' }"><a href="#" @click.prevent="page('Grid')">Grid</a></li>
                    <li :class="{ 'active': activePage == 'CanvasEngine' }"><a href="#" @click.prevent="page('CanvasEngine')">CanvasEngine</a></li>
                    <li :class="{ 'active': activePage == 'CanvasSignature' }"><a href="#" @click.prevent="page('CanvasSignature')">CanvasSignature</a></li>
                </ul>
            </div>
        </div>
    </nav>

</template>

<style>

</style>

<script>

    export default {

        props: ['activePage'],

        methods: {
            page(name) {
                this.activePage = name;
            }
        },

    }

</script>