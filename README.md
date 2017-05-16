<h2>生成表单类creatSelect</h2>
<dl>
    <dt>默认配置参数:</dt>
</dl>

		this.cfg = {
		type: 'selectOne',
		creatSelectNum: 'Q1',
		creatSelectTitle: '文本',
		creatSelectContent: 'selectMany', /selectMany/textarea
		target: 'body',
		};

<dl>
	<dt>方法：</dt>
	<dd>init(cfg)
		<ul>
			<li>根据传入参数生成对应的dom结构，插入页面</li>
			<li>.creatSelect_div_content部分：绑定事件-删除某一项输入栏</li>
			<li>.creatSelect_div_addNewSelect部分绑定事件-增加一项输入栏</li>
			<li>.creatSelect_div_control部分绑定事件-上移，下移，复用，删除</li>
			<li>JS根据传入参数，页面中已存在的.creatSelect结构生成符合要求的DOM结构，插入到页面中</li>
		</ul>
	</dd>
	<dd>selectControlBindEvents($selectControl,self,CFG)
		<ul>
			<li>为传入的DON $selectControl绑定事件</li>
			<li>复用时，把当前点击的那个.creatSelect(记为B)clone一份</li>
			<li>B插入完成之后，刷新一次Qnum,如Q1,Q2，调用refreshAllQnum()</li>
			<li>绑定上移点击事件</li>
				<ul>
					<li>找出当前点击的这个.creatSelect在页面中所有.creatSelect中是第几个</li>
					<li>当前这个.creatSelect(记为B)插入到上一个.creatSelect(记为A)的前面</li>
					<li>为了将A上面绑定的事件保留，B需要先clone(true)后remove()</li>
					<li>重新编排Qnum,如Q1,Q2,调用refreshAllQnum()</li>
				</ul>
			<li>下移，删除，等操作如上,不再赘述</li>
		</ul>
	</dd>
	<dd>checkAllUpDown()
		<ul>
			<li>根据页面中存在的表单个数和表单位置，判断表单部分的上移，下移按钮是否应该显示</li>
		</ul>
	</dd>
	<dd>renderQnum()
		<ul>
			<li>根据页面中存在的表单个数和表单位置，生成每一个表单项标题的前缀，如Q1,Q2</li>
		</ul>
	</dd>
	<dd>refreshAllQnum()
		<ul>
			<li>在执行上移/下移/删除操作后，执行该函数，更新每个.creatSelect的Qnum,如Q1,Q2</li>
		</ul>
	</dd>
	<dd></dd>
</dl>
