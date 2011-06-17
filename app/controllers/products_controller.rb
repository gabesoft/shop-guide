class ProductsController < ApplicationController
  def index
    @products = Product.where(search_options).sort(:name).all

    respond_to do |format|
      format.html
      format.xml  { render :xml => @products }
      format.json  { render :json => @products.to_json }
    end
  end

  def hint
    respond_to do |format|
      format.json { render :json => getHints }
      format.all { render :text => "only JSON format is supported" }
    end
  end
  
  def show
    @product = Product.find_by_slug(params[:id])
    respond_to do |format|
      format.html
      format.xml  { render :xml => @product }
      format.json  { render :json => @product.to_json }
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
    @product = Product.new(:name => productName, :category => productCategory, :tags => productTags)

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
      if @product.update_attributes(:name => productName, :category => productCategory, :tags => productTags)
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

  def productName
    params[:product][:name]
  end

  def productTags
    params[:product][:tags].nil? ? [] : params[:product][:tags].split(/, */)
  end

  def productCategory
    params[:product][:category]
  end

  def searchQuery
    params[:query] ? params[:query] : ''
  end

  def searchQueryPattern
    /#{Regexp.quote searchQuery}/i
  end

  def search_options
    options = {}

    if !searchQuery.empty?
      options = { :$or => [ { :name => searchQueryPattern }, { :category => searchQueryPattern } ] }
    end
    options
  end
  
  def getFilteredProducts
    # TODO: implement and remove search_options
  end

  def getHints
    if searchQuery.empty? 
      [] 
    else
      products = Product.
        where(:name => searchQueryPattern).
        fields(:name, :category).
        limit(10).all.
        map { |p| { :name => p.name, :priority => 1 } }

      categories = Product.
        where(:category => searchQueryPattern).
        fields(:category).all.
        map { |p| p.category.split(':').reverse.each_with_index.map { |c,i| { :v => c, :i => i + 2 } } }.
        map { |categories| categories.find_all { |h| searchQueryPattern.match(h[:v]) } }.
        flatten.map { |h| { :name => h[:v], :priority => h[:i] } }

      (products + categories).
        uniq { |c| c[:name] }.
        sort! { |a, b| [ a[:priority], a[:name] ]<=> [ b[:priority], b[:name] ] }
    end
  end

end
