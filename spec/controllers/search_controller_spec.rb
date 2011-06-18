require 'spec_helper'

describe SearchController do

  def products_range count
    ( 1 .. count ).to_a.
      map { |n| Product.create! :name => "product#{n}", 
                                :category => "food:other",
                                :tags => (1 .. n).to_a.map { |x| "t#{x}" } }
  end

  def create_products
    values = [
      { :name => 'blue diamond cookies',  :category => "food:sweets:cookies", :tags => ['jewelery'] },
      { :name => 'italian biscotti',      :category => "food:sweets:biscotti", :tags => ['jewelery'] },
      { :name => 'cornflakes',            :category => "food:breakfast:cereals", :tags => ['breakfast', 'food'] },
      { :name => 'milk 1%',               :category => "food:dairy:milk", :tags => ['dairy', 'organic'] },
      { :name => 'shaved chocolate',      :category => "food:sweets:chocolate", :tags => ['beauty', 'health'] },
      { :name => 'whipped cream',         :category => "food:sweets:cake frosting", :tags => ['beauty', 'health'] },
      { :name => 'brazilian vanilla',     :category => "food:spice product:vanilla", :tags => ['beauty', 'health'] },
      { :name => 'chinese vanilla',       :category => "food:spice product:vanilla", :tags => ['beauty', 'health'] },
      { :name => 'foo bar',               :category => "food:prod cat 1:prod cat 2", :tags => ['beauty', 'health'] },
      { :name => 'foo bar product',       :category => "food:other", :tags => ['beauty', 'health'] },
      { :name => 'fancy product',         :category => "food:other:product:b:c", :tags => ['beauty', 'health'] },
    ]
    values.each { |v| Product.create! v }
  end
  
  describe "GET producthints" do
    it "should get only the first ten matching names" do
      products_range 20
      get :producthints, :query => 'prod', :format => :json
      JSON.parse(response.body).count.should eq 10
    end

    it "should get the first ten matching names and all matching categories" do
      products_range 20
      create_products
      get :producthints, :query => 'prod', :format => :json
      hints = JSON.parse response.body
      hints.length.should eq 14
    end

    it "should prioritize names, more specific categories, less specific categories" do
      create_products
      get :producthints, :query => 'prod', :format => :json
      hints = JSON.parse response.body
      hints.should eq [
        { 'name' => 'fancy product',    'priority' => 1 },
        { 'name' => 'foo bar product',  'priority' => 1 },
        { 'name' => 'prod cat 2',       'priority' => 998 },
        { 'name' => 'product',          'priority' => 998 },
        { 'name' => 'prod cat 1',       'priority' => 999 },
        { 'name' => 'spice product',    'priority' => 999 },
      ]
    end

    it "should return distinct names in results" do
      create_products
      get :producthints, :query => 'spice', :format => :json
      hints = JSON.parse response.body
      hints.should eq [ { "name" => "spice product", "priority" => 999 } ]
    end
  end

  describe "GET products" do
    it "should return filtered products sorted by relevance then name" do
      # products should be prioritized from the most specific match
      # products should be sorted by priority then name
      create_products
      get :products, :query => 'prod', :format => :json
      products = (JSON.parse response.body).map { |p| { :name => p['name'], :priority => p['priority'] } }
      products.should eq [
        { :name => 'fancy product',     :priority => 1 },
        { :name => 'foo bar product',   :priority => 1 },
        { :name => 'foo bar',           :priority => 998 },
        { :name => 'brazilian vanilla', :priority => 999 },
        { :name => 'chinese vanilla',   :priority => 999 },
      ]
    end
  end
end
