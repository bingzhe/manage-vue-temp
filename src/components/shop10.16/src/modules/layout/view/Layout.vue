<template>
    <div class="app-wrapper">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <navbar></navbar>
			<app-main></app-main>
		</div>
    </div>
</template>

<script>
import Sidebar from './Sidebar';
import AppMain from './AppMain';
import Navbar from './Navbar';

export default {
    components: {
        Sidebar,
        AppMain,
        Navbar
    }
};
</script>


<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
    position: relative;
    @include wh(100%, 100vh);

    .sidebar-container {
        width: 210px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow-y: auto;
        transition: all .28s ease-out;
        // border-right: 1px solid #ccc;
    }

    .main-container {
        min-height: 100%;
        transition: margin-left 0.28s ease-out;
        margin-left: 210px;
        background-color: #EFF3FA;
	}
}
</style>

