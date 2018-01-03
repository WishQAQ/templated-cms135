<?php
$z[0]=Array("field","",64,83);
$z[0][4]['name']="title";
$z[1]=Array("global","",84,110);
$z[1][4]['name']="cfg_webname";
$z[2]=Array("include","",1543,1578);
$z[2][4]['filename']="head.htm";
$z[3]=Array("field","",1694,1723);
$z[3][4]['name']="typename";
$z[4]=Array("channel","\r\n<li><a href=\"[field:typeurl/]\">[field:typename/]</a></li>\r\n",1807,1981);
$z[4][4]['type']="son";
$z[4][4]['currentstyle']="<li><a href='~typelink~' id='active'>~typename~</a></li>";
$z[5]=Array("list","\r\n<li>\r\n<dl id=\"news_l\"><em>Date</em><b>[field:pubdate function=\"MyDate('m',@me)\"/]</b><i>[field:pubdate function=\"MyDate('Y',@me)\"/]</i></dl>\r\n<span>\r\n<h3><a href=\"[field:arcurl/]\">[field:title/]</a></h3>\r\n<em>分类：[field:typename/]<br>浏览次数：<script src=\"{dede:field name='phpurl'/}/count.php?view=yes&aid={dede:field name='id'/}&mid={dede:field name='mid'/}\" type='text/javascript' language=\"javascript\"></script></em>\r\n<p>[field:infos/]…</p>\r\n</span>\r\n<s><a href=\"[field:arcurl/]\" title=\"[field:title/]\"><img src=\"[field:picname/]\" width=\"175\" height=\"110\" alt=\"[field:title/]\"></a></s>\r\n</li>\r\n",2078,2741);
$z[5][4]['pagesize']="6";
$z[5][4]['infolen']="500";
$z[6]=Array("pagelist","",2775,2841);
$z[6][4]['listitem']="index,pre,next,pageno,end";
$z[6][4]['listsize']="5";
$z[7]=Array("include","",2878,2915);
$z[7][4]['filename']="footer.htm";

?>