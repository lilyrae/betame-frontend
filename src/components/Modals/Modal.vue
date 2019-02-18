<template>
    <div class="modal" @click="handleModalClick" :style="styleVisible" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content bg-light">
                <div class="modal-header">
                    <h5 class="modal-title beta-title hide-overflow"><slot name="header"></slot></h5>
                    <button type="button" class="close" @click="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body beta-text">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../../event-bus.js';

export default {
    name: 'Modal',
    props: {
        isVisible: Boolean
    },
    methods: {
        close() {
            EventBus.$emit('closeModal')
        },
        handleModalClick(event) {
            if (event.target.className === "modal") {
                this.close()
            }
        }
    },
    computed: {
        styleVisible() {
            if (this.isVisible) {
                return {'display': 'block'}
            } else {
                return {'display': 'none'}
            }
            
        }
    }
}
</script>

<style scoped>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
    border: 2px solid #4996a29e;
}
</style>
