class ProductsController < ApplicationController
  def index
    @products = Product.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @products }
      format.json  { render :json => @product.to_json }
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
    @product = Product.new(:name => paramsName, :tags => paramsTags)

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
      if @product.update_attributes(:name => paramsName, :tags => paramsTags)
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

  def paramsName
    params[:product][:name]
  end

  def paramsTags
    params[:product][:tags].nil? ? [] : params[:product][:tags].split(/, */)
  end
end
