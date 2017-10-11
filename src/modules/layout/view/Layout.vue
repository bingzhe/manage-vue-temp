<template>
    <div class="app-wrapper">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
			<app-main></app-main>
		</div>
    </div>
</template>

<script>
import Sidebar from './Sidebar'
import AppMain from './AppMain'

export default {
    components: {
        Sidebar,
        AppMain
    }
}
</script>


<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

.app-wrapper {
    position: relative;
    @include wh(100%, 100%);

    .sidebar-container {
        width: 220px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow-y: auto;
        transition: all .28s ease-out;
    }

    .main-container {
        min-height: 100%;
        transition: margin-left 0.28s ease-out;
        margin-left: 220px;
	}
}
</style>

