class ProductsController < ApplicationController

  def index
    @products = get_filtered_products

    respond_to do |format|
      format.html
      format.xml  { render :xml => @products }
      format.json  { render :json => ( @products.to_json :methods => [ :priority ] ) }
    end
  end

  def hint
    respond_to do |format|
      format.json { render :json => get_hints }
      format.all { render :text => "only JSON format is supported" }
    end
  end
  
  def show
    @product = Product.find_by_slug(params[:id])
    respond_to do |format|
      format.html
      format.xml  { render :xml => @product }
      format.json  { render :json => @product }
    end
  end

  def new
    @product = Product.new

    respond_to do |format|
      format.html
      format.xml  { render :xml => @product }
      format.json  { render :json => @product }
    end
  end

  def edit
    @product = Product.find_by_slug(params[:id])
  end

  def create
    @product = Product.new(:name => product_name, :category => product_category, :tags => product_tags)

    respond_to do |format|
      if @product.save
        format.html { redirect_to(@product, :notice => 'Product was successfully created.') }
        format.xml  { render :xml => @product, :status => :created, :location => @product }
        format.json { render :json => @product.to_json, :status => :created, :location => @product }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @product.errors, :status => :unprocessable_entity }
        format.json  { render :json => @product.errors, :status => :unprocessable_entity }
      end
    end
  end

  def update
    @product = Product.find_by_slug(params[:id])

    respond_to do |format|
      if @product.update_attributes(:name => product_name, :category => product_category, :tags => product_tags)
        format.html { redirect_to(@product, :notice => 'Product was successfully updated.') }
        format.xml  { head :ok }
        format.json  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @product.errors, :status => :unprocessable_entity }
        format.json  { render :json => @product.errors, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @product = Product.find_by_slug(params[:id])
    @product.destroy

    respond_to do |format|
      format.html { redirect_to(products_url) }
      format.xml  { head :ok }
      format.json  { head :ok }
    end
  end

  def destroy_all
    # TODO: delete products at the database level
    Product.all.each { |p| p.destroy }
    redirect_to products_url
  end

  def export
    respond_to do |format|
      format.json { render :json => Product.all }
      format.all { render :text => "only JSON format is supported" }
    end
  end

  def import
    file = params[:file]
    if !file.nil?
      products = JSON.parse(file.read)
      products.each { |p| Product.create! p }
    end
    redirect_to products_url
  end

  private

  def product_name
    params[:product][:name]
  end

  def product_tags
    params[:product][:tags].nil? ? [] : params[:product][:tags].split(/, */)
  end

  def product_category
    params[:product][:category]
  end

  def search_query
    params[:query] ? params[:query] : ''
  end

  def search_query_pattern
    /#{Regexp.quote search_query}/i
  end

  def get_filtered_products
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
      
      (by_name + by_category).sort { |a, b| [ a.priority, a.name ] <=> [ b.priority, b.name ] }
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
