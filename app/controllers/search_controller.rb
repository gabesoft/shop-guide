class SearchController < ApplicationController

  def products
    respond_to do |format|
      format.json { render :json => get_products }
      format.all { render :text => "only JSON format is supported" }
    end
  end

  def producthints
    respond_to do |format|
      format.json { render :json => get_hints }
      format.all { render :text => "only JSON format is supported" }
    end
  end

  private

  def search_query
    params[:query] ? params[:query] : ''
  end

  def search_pattern
    /#{Regexp.quote search_query}/i
  end

  def get_products
    return [] if search_query.empty?

    by_name = Product.where(:name => search_pattern).all
    by_category = Product.where(:category => search_pattern, :name => { :$not => search_pattern }).all

    by_name.each { |p| p.add_attrs :priority => 1 }
    by_category.each do |p|
      categories = (categories_indexed p).
        find_all { |c| search_pattern.match c[:name] }.
        sort! { |a, b| a[:priority] <=> b[:priority] }
      p.add_attrs :priority => categories[0][:priority]
    end

    (by_name + by_category).
      sort { |a, b| [ a.priority, a.name ] <=> [ b.priority, b.name ] }.
      map { |p| { :id => p.id, :name => p.name, :priority => p.priority, :category => p.category } }
  end

  def get_hints
    return [] if search_query.empty?

    products = Product.
      where(:name => search_pattern).
      fields(:name, :category).
      limit(10).all.map { |p| { :name => p.name, :priority => 1 } }

    categories = Product.
      where(:category => search_pattern).
      fields(:category).all.
      map { |p| (categories_indexed p).find_all { |h| search_pattern.match h[:name] } }.
      flatten

    (products + categories).
      uniq { |c| c[:name] }.
      sort! { |a, b| [ a[:priority], a[:name] ] <=> [ b[:priority], b[:name] ] }
  end

  def categories_indexed product
    seed = 1000
    product.category.split(':').each_with_index.map { |c,i| { :name => c, :priority => seed - i } }
  end

end
