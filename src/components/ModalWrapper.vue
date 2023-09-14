<template>
    <!-- Modal trigger button -->
    <button v-if="showButton" type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal"
        :data-bs-target="'#' + id">
        Launch
    </button>

    <!-- Modal Body -->
    <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
    <div class="modal fade" :id="id" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
        aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="header">
                        <div class="d-flex justify-content-end w-100"><i class="mdi mdi-close fs-3 selectable"
                                data-bs-dismiss="modal"></i></div>
                    </slot>
                </div>
                <div class="modal-body">
                    <slot name="body">
                    </slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    props: { showButton: { type: Boolean, default: false }, id: { type: String, required: true } },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped></style>