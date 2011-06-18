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

  def search_query_pattern
    /#{Regexp.quote search_query}/i
  end

  def get_products
    if search_query.empty?
      Product.sort(:name).all.each { |p| p.add_attrs :priority => 1 }
    else
      by_name = Product.where(:name => search_query_pattern).all
      by_category = Product.
        where(:category => search_query_pattern).all.
        find_all { |p| !search_query_pattern.match p[:name] }

      by_name.each { |p| p.add_attrs :priority => 1 }
      by_category.each do |p|
        categories = (categories_indexed p).
          find_all { |c| search_query_pattern.match(c[:name]) }.
          sort! { |a, b| a[:priority] <=> b[:priority] }
        p.add_attrs :priority => categories[0][:priority]
      end

      (by_name + by_category).
        sort { |a, b| [ a.priority, a.name ] <=> [ b.priority, b.name ] }.
        map { |p| { :id => p.id, :name => p.name, :priority => p.priority, :category => p.category } }
    end
  end

  def get_hints
    if search_query.empty?
      []
    else
      products = Product.
        where(:name => search_query_pattern).
        fields(:name, :category).
        limit(10).all.map { |p| { :name => p.name, :priority => 1 } }

      categories = Product.
        where(:category => search_query_pattern).
        fields(:category).all.
        map { |p| (categories_indexed p).find_all { |h| search_query_pattern.match(h[:name]) } }.
        flatten

      (products + categories).
        uniq { |c| c[:name] }.
        sort! { |a, b| [ a[:priority], a[:name] ] <=> [ b[:priority], b[:name] ] }
    end
  end

  def categories_indexed product
    seed = 1000
    product.category.split(':').each_with_index.map { |c,i| { :name => c, :priority => seed - i } }
  end

end
