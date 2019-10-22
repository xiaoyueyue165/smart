var TableView = 
(function () {

function TableView( datas ) {
    this.__datas__ = datas;
    this.init();
}

var fn = TableView.fn = TableView.prototype = {
    constructor: TableView,
    // 初始化
    init: function () {
        var oldId = this.id;
        this.DOM = TableView.__update__( this.__datas__, this.id = TableView.random() );
        if ( this.selectorNode ) {
            // 已经加上了, 直接从 selectorNode 上移除
            // 移除的不应该是 所有的代码, 而应该是刚刚加上的 table 标签
            // 根据 this.id 得到要移除的元素, 然后再 移除新增
            var obj = TableView.id( oldId );
            this.selectorNode.removeChild( obj );

            this.selectorNode.appendChild( this.DOM );
        }
    }
};

TableView.extend = fn.extend = function ( obj ) {
    for ( var k in obj ) {
        this[ k ] = obj[ k ];
    }
};

// 工具方法( 将其定义成实例还是静态 )
// __update__(), 该方法需要访问 this.__datas__ 才可以创建 table
// __update__( datas ), 可以利用参数, 将 this.__datas__ 传入, 因此可以定义成静态
// 
// 在封装性中一个非常重要的设计原则: 高内聚, 低耦合.
// 内聚性: 内部的所有功能朝一个方向发力.
// 耦合性: 配合与依赖的程度. 

// 工具型方法
TableView.extend({
    __update__: function ( datas, id ) {
        var table = document.createElement( 'table' );
        table.width = '400';   // <table border="1" width="400">
        table.border = '1';
        table.id = id;
        var tbody = document.createElement( 'tbody' );
        table.appendChild( tbody );
        for ( var i = 0; i < datas.length; i++ ) {
            var tr = document.createElement( 'tr' );
            var tds = '<td>' + ( i + 1 ) + '</td>';
            for ( var k in datas[ i ] ) {
                tds += '<td>' + datas[ i ][ k ] + '</td>';
            }
            tr.innerHTML = tds;
            tbody.appendChild( tr );
        }
        return table;
    },
    id: function ( idName ) {
        return document.getElementById( idName );
    },
    random: function () {
        return +new Date() + ( Math.random()*1000000 + '' ).replace( '.', '' );
    }
});

// 核心功能方法( DOM 相关 )
fn.extend({
    addTo: function ( idSelector ) {
        var node = TableView.id( idSelector );
        this.selectorNode = node; // 后面用于判断是否已经存过
        // 将 this.DOM 追加到 node 里面
        node.appendChild( this.DOM );
    }
});

// 核心功能方法( 数据相关 )
fn.extend({
    addData: function ( data ) {
        this.__datas__.push( data );
        // 重新渲染生成 table, 加到 this.DOM 中
        // 判断有没有加过, 否则就加到页面中
        this.init();
    },
    rmData: function ( index ) {
        this.__datas__.splice( index, 1 );
        this.init();
    }
});



return TableView;


// window.TableView = TableView;

})();