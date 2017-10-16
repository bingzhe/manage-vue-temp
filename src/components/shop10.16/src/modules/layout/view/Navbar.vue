<template>
    <div id="Navbar">
        <nav class="nav"></nav>
        <div class="banner">
            <div>
                img
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {

        };
    }
};
</script>

<style lang="scss" scoped>
    .nav{
        height: 55px;
        background-color: rgb(72, 119, 231);
    }
    .banner{
        height: 160px;
        padding: 14px;

        div{
            height: 130px;
            border: 1px solid #ccc;
        }
    }
</style>