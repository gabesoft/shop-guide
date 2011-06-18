function pages_preview_path(params){ return '/pages/preview' + (params && params.format ? '.' + params.format : ''); }
function pages_home_path(params){ return '/pages/home' + (params && params.format ? '.' + params.format : ''); }
function pages_contact_path(params){ return '/pages/contact' + (params && params.format ? '.' + params.format : ''); }
function pages_about_path(params){ return '/pages/about' + (params && params.format ? '.' + params.format : ''); }
function root_path(params){ return '/' + (params && params.format ? '.' + params.format : ''); }
function clear_products_path(params){ return '/products/clear' + (params && params.format ? '.' + params.format : ''); }
function import_products_path(params){ return '/products/import' + (params && params.format ? '.' + params.format : ''); }
function export_products_path(params){ return '/products/export' + (params && params.format ? '.' + params.format : ''); }
function products_path(params){ return '/products' + (params && params.format ? '.' + params.format : ''); }
function new_product_path(params){ return '/products/new' + (params && params.format ? '.' + params.format : ''); }
function edit_product_path(params){ return '/products/' + params.id + '/edit' + (params && params.format ? '.' + params.format : ''); }
function product_path(params){ return '/products/' + params.id + '' + (params && params.format ? '.' + params.format : ''); }
function search_products_path(params){ return '/search/products' + (params && params.format ? '.' + params.format : ''); }
function search_producthints_path(params){ return '/search/producthints' + (params && params.format ? '.' + params.format : ''); }
function rails_info_properties_path(params){ return '/rails/info/properties' + (params && params.format ? '.' + params.format : ''); }
