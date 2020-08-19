var table=null,colName=0,colLoot=1,colWishlist=2,colRecipes=3,colRoles=4,colNotes=5,colClass=6,colRaid=7;function createTable(){return memberTable=$("#characterTable").DataTable({autoWidth:!1,data:characters,columns:[{title:'<span class="fas fa-fw fa-user"></span> Character',data:"character",render:function render(e,a,t){return'\n                    <ul class="no-bullet no-indent mb-2">\n                        <li>\n                            <a href="/'.concat(guild.slug,"/c/").concat(t.name,'"\n                                class="text-4 text-').concat(t.class?t.class.toLowerCase():"",' font-weight-bold"\n                                title="').concat(t.member?t.member.username:"",'">\n                                ').concat(t.name,"\n                            </a>\n                        </li>\n\n                        ").concat(t.raid_name||t.class?'\n                            <li>\n                                <span class="font-weight-bold">\n                                    <span class="role-circle" style="background-color:'.concat(t.raid_color?getColorFromDec(parseInt(t.raid_color)):"",'"></span>\n                                    ').concat(t.raid_name?t.raid_name:"","\n                                </span>\n                                ").concat(t.class?t.class:"","\n                            </li>"):"","\n\n                        ").concat(t.level||t.race||t.spec?"\n                            <li>\n                                <small>\n                                    ".concat(t.level?t.level:"","\n                                    ").concat(t.race?t.race:"","\n                                    ").concat(t.spec?t.spec:"","\n                                </small>\n                            </li>"):"","\n\n                        ").concat(t.rank||t.profession_1||t.profession_2?"\n                            <li>\n                                <small>\n                                    ".concat(t.rank?"Rank "+t.rank+(t.profession_1||t.profession_2?",":""):"","\n                                    ").concat(t.profession_1?t.profession_1+(t.profession_2?",":""):"","\n                                    ").concat(t.profession_2?t.profession_2:"","\n                                </small>\n                            </li>"):"","\n                    </ul>")},visible:!0,width:"250px"},{title:'<span class="text-success fas fa-fw fa-sack"></span> Loot Received',data:"received",render:function render(e,a,t){return e&&e.length?getItemList(e,"received",t.id):"—"},orderable:!1,visible:!0,width:"280px"},{title:'<span class="text-legendary fas fa-fw fa-scroll-old"></span> Wishlist',data:"wishlist",render:function render(e,a,t){return e&&e.length?getItemList(e,"wishlist",t.id):"—"},orderable:!1,visible:!0,width:"280px"},{title:'<span class="text-gold fas fa-fw fa-book"></span> Recipes',data:"recipes",render:function render(e,a,t){return e&&e.length?getItemList(e,"recipes",t.id):"—"},orderable:!1,visible:!1,width:"280px"},{title:"Roles",data:"user.roles",render:function render(e,a,t){var n="";return e&&e.length>0?(n='<ul class="list-inline">',e.forEach(function(e,a){var t=0!=e.color?"#"+rgbToHex(e.color):"#FFFFFF";n+='<li class="list-inline-item"><span class="tag" style="border-color:'.concat(t,';"><span class="role-circle" style="background-color:').concat(t,'"></span>').concat(e.name,"</span></li>")}),n+="</ul>"):n="—",n},orderable:!1,visible:!1},{title:'<span class="fas fa-fw fa-comment-alt-lines"></span> Notes',data:"public_note",render:function render(e,a,t){return(t.public_note?nl2br(t.public_note):"—")+(t.officer_note?'<br><small class="font-weight-bold"><u>Officer\'s Note</u></small><br><em>'+nl2br(t.officer_note)+"</em>":"")},orderable:!1,visible:!0,width:"280px"},{title:"Class",data:"class",render:function render(e,a,t){return t.class?t.class:null},visible:!1},{title:"Raid",data:"raid",render:function render(e,a,t){return t.raid_name?t.raid_name:null},visible:!1}],order:[],paging:!1,initComplete:function initComplete(){var e=[colClass,colRaid];this.api().columns().every(function(a){var t=this,n=null,l=null;a==colClass&&(n=$("#class_filter"),l=null),a==colRaid&&(n=$("#raid_filter"),l=null),e.includes(a)&&(n.on("change",function(){var e=$.fn.dataTable.util.escapeRegex($(this).val());l&&l.val()&&(e="(?=.*"+e+")(?=.*"+$.fn.dataTable.util.escapeRegex(l.val())+")"),t.search(e||"",!0,!1).draw()}),l&&l.on("change",function(){var e=$.fn.dataTable.util.escapeRegex($(this).val());n&&n.val()&&(e="(?=.*"+e+")(?=.*"+$.fn.dataTable.util.escapeRegex(n.val())+")"),t.search(e||"",!0,!1).draw()}))}),makeWowheadLinks(),addItemAutocompleteHandler(),addTagInputHandlers()}}),memberTable}function addClippedItemHandlers(){$(".js-show-clipped-items").click(function(){var e=$(this).data("id"),a=$(this).data("type");$(".js-clipped-item[data-id='"+e+"'][data-type='"+a+"']").show(),$(".js-show-clipped-items[data-id='"+e+"'][data-type='"+a+"']").hide(),$(".js-hide-clipped-items[data-id='"+e+"'][data-type='"+a+"']").show()}),$(".js-hide-clipped-items").click(function(){var e=$(this).data("id"),a=$(this).data("type");$(".js-clipped-item[data-id='"+e+"'][data-type='"+a+"']").hide(),$(".js-show-clipped-items[data-id='"+e+"'][data-type='"+a+"']").show(),$(".js-hide-clipped-items[data-id='"+e+"'][data-type='"+a+"']").hide()})}function getItemList(e,a,t){var n='<ol class="no-indent js-item-list mb-2" data-type="'.concat(a,'" data-id="').concat(t,'">'),l=4;return $.each(e,function(l,s){var i=!1;l>=4&&(i=!0,4==l&&(n+='<li class="js-show-clipped-items small cursor-pointer no-bullet " data-type="'.concat(a,'" data-id="').concat(t,'">show ').concat(e.length-4," more…</li>"))),n+='\n            <li class="font-weight-normal '.concat(i?"js-clipped-item":"",'" data-type="').concat(a,'" data-id="').concat(t,'"\n                style="').concat(i?"display:none;":"",'">\n                <a href="/').concat(guild.slug,"/i/").concat(s.item_id,"/").concat(slug(s.name),'"\n                    data-wowhead-link="https://classic.wowhead.com/item=').concat(s.item_id,'"\n                    data-wowhead="item=').concat(s.item_id,'?domain=classic">\n                    ').concat(s.name,'\n                </a>\n                <span class="js-watchable-timestamp js-timestamp-title smaller text-muted"\n                    data-timestamp="').concat(s.pivot.created_at,'"\n                    data-title="added by ').concat(s.added_by_username,' at"\n                    data-is-short="1">\n                </span>\n            </li>')}),e.length>4&&(n+='<li class="js-hide-clipped-items small cursor-pointer no-bullet" style="display:none;" data-type="'.concat(a,'" data-id="').concat(t,'">show less</li>')),n+="</ol>"}$(document).ready(function(){table=createTable(),$(".toggle-column").click(function(e){e.preventDefault();var a=table.column($(this).attr("data-column"));a.visible(!a.visible())}),$(".toggle-column-default").click(function(e){e.preventDefault(),table.column(colName).visible(!0),table.column(colRoles).visible(!1),table.column(colLoot).visible(!0),table.column(colWishlist).visible(!0),table.column(colRecipes).visible(!1),table.column(colNotes).visible(!0)}),table.on("column-visibility.dt",function(e,a,t,n){makeWowheadLinks(),addClippedItemHandlers(),trackTimestamps()}),addClippedItemHandlers(),trackTimestamps()});
