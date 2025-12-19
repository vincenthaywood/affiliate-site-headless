<?php
/**
 * Plugin Name: Headless Affiliate Site - Setup Helper
 * Description: Automatically configures WordPress for the headless affiliate site
 * Version: 1.0.0
 * Author: VH Digital
 */

// Register Products Post Type
function has_register_products_post_type() {
    $labels = array(
        'name'               => 'Products',
        'singular_name'      => 'Product',
        'add_new'            => 'Add New Product',
        'add_new_item'       => 'Add New Product',
        'edit_item'          => 'Edit Product',
        'new_item'           => 'New Product',
        'view_item'          => 'View Product',
        'search_items'       => 'Search Products',
        'not_found'          => 'No products found',
        'not_found_in_trash' => 'No products found in trash',
        'menu_name'          => 'Products'
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'query_var'           => true,
        'rewrite'             => array('slug' => 'products'),
        'capability_type'     => 'post',
        'has_archive'         => true,
        'hierarchical'        => false,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-products',
        'supports'            => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'product',
        'graphql_plural_name' => 'products',
        'taxonomies'          => array('category', 'post_tag'),
    );

    register_post_type('product', $args);
}
add_action('init', 'has_register_products_post_type');

// Add admin notice to guide setup
function has_admin_notice() {
    $screen = get_current_screen();
    
    if ($screen->id === 'plugins') {
        ?>
        <div class="notice notice-success is-dismissible">
            <h3>🎉 Headless Affiliate Site - Setup Helper Activated!</h3>
            <p><strong>Products post type has been registered.</strong></p>
            <p>Next steps:</p>
            <ol>
                <li><strong>Install Required Plugins:</strong>
                    <ul>
                        <li>✓ WPGraphQL - <a href="<?php echo admin_url('plugin-install.php?s=wpgraphql&tab=search&type=term'); ?>">Install</a></li>
                        <li>✓ Advanced Custom Fields Pro - <a href="https://www.advancedcustomfields.com/pro/" target="_blank">Purchase</a></li>
                        <li>✓ WPGraphQL for ACF - <a href="https://github.com/wp-graphql/wpgraphql-acf" target="_blank">Download</a></li>
                    </ul>
                </li>
                <li><strong>Create ACF Field Group:</strong> Go to <a href="<?php echo admin_url('post-new.php?post_type=acf-field-group'); ?>">Custom Fields → Add New</a></li>
                <li><strong>Create Your First Product:</strong> Go to <a href="<?php echo admin_url('post-new.php?post_type=product'); ?>">Products → Add New</a></li>
            </ol>
            <p>📖 Full setup instructions: <a href="https://github.com/vincenthaywood/affiliate-site-headless/blob/main/SETUP.md" target="_blank">View Setup Guide</a></p>
        </div>
        <?php
    }
}
add_action('admin_notices', 'has_admin_notice');

// Add custom columns to Products list
function has_products_columns($columns) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['featured_image'] = 'Image';
    $new_columns['title'] = $columns['title'];
    $new_columns['price'] = 'Price';
    $new_columns['rating'] = 'Rating';
    $new_columns['categories'] = 'Categories';
    $new_columns['date'] = $columns['date'];
    return $new_columns;
}
add_filter('manage_product_posts_columns', 'has_products_columns');

function has_products_column_content($column, $post_id) {
    switch ($column) {
        case 'featured_image':
            if (has_post_thumbnail($post_id)) {
                echo get_the_post_thumbnail($post_id, array(50, 50));
            }
            break;
        case 'price':
            $price = get_field('price', $post_id);
            if ($price) {
                echo '$' . number_format($price, 2);
            }
            break;
        case 'rating':
            $rating = get_field('rating', $post_id);
            if ($rating) {
                echo str_repeat('⭐', round($rating)) . ' (' . $rating . ')';
            }
            break;
    }
}
add_action('manage_product_posts_custom_column', 'has_products_column_content', 10, 2);

// Flush rewrite rules on activation
function has_activate() {
    has_register_products_post_type();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'has_activate');

// Flush rewrite rules on deactivation
function has_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'has_deactivate');

// Add ACF field group programmatically (if ACF is installed)
function has_create_acf_fields() {
    if (function_exists('acf_add_local_field_group')) {
        acf_add_local_field_group(array(
            'key' => 'group_affiliate_fields',
            'title' => 'Affiliate Fields',
            'fields' => array(
                array(
                    'key' => 'field_price',
                    'label' => 'Price',
                    'name' => 'price',
                    'type' => 'number',
                    'required' => 1,
                    'show_in_graphql' => 1,
                ),
                array(
                    'key' => 'field_compare_price',
                    'label' => 'Compare Price',
                    'name' => 'comparePrice',
                    'type' => 'number',
                    'show_in_graphql' => 1,
                ),
                array(
                    'key' => 'field_affiliate_link',
                    'label' => 'Affiliate Link',
                    'name' => 'affiliateLink',
                    'type' => 'url',
                    'required' => 1,
                    'show_in_graphql' => 1,
                ),
                array(
                    'key' => 'field_rating',
                    'label' => 'Rating',
                    'name' => 'rating',
                    'type' => 'number',
                    'min' => 0,
                    'max' => 5,
                    'step' => 0.1,
                    'show_in_graphql' => 1,
                ),
                array(
                    'key' => 'field_review_count',
                    'label' => 'Review Count',
                    'name' => 'reviewCount',
                    'type' => 'number',
                    'show_in_graphql' => 1,
                ),
                array(
                    'key' => 'field_buy_button_text',
                    'label' => 'Buy Button Text',
                    'name' => 'buyButtonText',
                    'type' => 'text',
                    'default_value' => 'Check Price',
                    'show_in_graphql' => 1,
                ),
                array(
                    'key' => 'field_features',
                    'label' => 'Features',
                    'name' => 'features',
                    'type' => 'repeater',
                    'show_in_graphql' => 1,
                    'sub_fields' => array(
                        array(
                            'key' => 'field_feature',
                            'label' => 'Feature',
                            'name' => 'feature',
                            'type' => 'text',
                            'show_in_graphql' => 1,
                        ),
                    ),
                ),
                array(
                    'key' => 'field_pros',
                    'label' => 'Pros',
                    'name' => 'pros',
                    'type' => 'repeater',
                    'show_in_graphql' => 1,
                    'sub_fields' => array(
                        array(
                            'key' => 'field_pro',
                            'label' => 'Pro',
                            'name' => 'pro',
                            'type' => 'text',
                            'show_in_graphql' => 1,
                        ),
                    ),
                ),
                array(
                    'key' => 'field_cons',
                    'label' => 'Cons',
                    'name' => 'cons',
                    'type' => 'repeater',
                    'show_in_graphql' => 1,
                    'sub_fields' => array(
                        array(
                            'key' => 'field_con',
                            'label' => 'Con',
                            'name' => 'con',
                            'type' => 'text',
                            'show_in_graphql' => 1,
                        ),
                    ),
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'product',
                    ),
                ),
            ),
            'show_in_graphql' => 1,
            'graphql_field_name' => 'affiliateFields',
        ));
    }
}
add_action('acf/init', 'has_create_acf_fields');
