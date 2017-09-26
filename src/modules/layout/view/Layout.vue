<template>
    <div class="app-wrapper">
        <div class="sidebar-wrapper">
            <sidebar class="sidebar-container"></sidebar>
        </div>
    </div>
</template>

<script>
import Sidebar from './Sidebar'

export default {
    components: {
        Sidebar
    }
}
</script>


<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

.app-wrapper {
    position: relative;
    @include wh(100%, 100%);

    .sidebar-wrapper {
        width: 180px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        transition: all .28s ease-out;
    }
}
</style>

