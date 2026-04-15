<?php
/**
 * Plugin Name: Elementor is Shite Fix
 * Description: Fixes the absolute nightmare workflow of Elementor by locking the widget panel and adding a secondary floating toolbox.
 * Version: 1.1.0
 * Author: Marketplace Dev
 */

if ( ! defined( 'ABSPATH' ) ) exit;

class Elementor_Is_Shite_Fix {

    public function __construct() {
        add_action( 'elementor/editor/after_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
        add_action( 'elementor/editor/after_enqueue_styles', [ $this, 'enqueue_styles' ] );
    }

    public function enqueue_scripts() {
        wp_enqueue_script(
            'eisf-logic-js',
            plugins_url( 'logic.js', __FILE__ ),
            [ 'jquery', 'elementor-editor' ],
            '1.1.0',
            true
        );
    }

    public function enqueue_styles() {
        wp_enqueue_style(
            'eisf-styles-css',
            plugins_url( 'styles.css', __FILE__ ),
            [],
            '1.1.0'
        );
    }
}

new Elementor_Is_Shite_Fix();