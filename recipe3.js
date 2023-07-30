//CSVファイルを読み込む関数getCSV()の定義
function getCSV3(){
    var req = new XMLHttpRequest(); 
    req.open("get", "fdlist.csv", true); 
    req.send(null); 
    req.onload = function(){
    console.log('hi');
	convertCSVtoArray3(req.responseText); 
    }
}

function convertCSVtoArray3(str){ 
    let result = str.split(','); 
    for(let i=0; i<result.length; i++){
    result[i] = result[i].replace(/'/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/\s+/g, '').replace('∮', '').replace('☺', '').replace('✿', '').replace('♥', '').replace('❤️', '').replace('✨', '').replace('♦', '').replace('⭐', '').replace('❣', '').replace('♡', '').replace('♪', '').replace(/u3000+/g, '').replace(/"+/g, '').replace('☺', '').replace('♪','').replace(/(\\|\/)/g,'');}
    let mended_result = result;
    mended_result.splice(18353, 1);
    console.log(mended_result.length)
    convertArraytoDict3(mended_result);
}

function convertArraytoDict3(list){
    let mended_dict = [];
    for(let i=0; i<(list.length)/2; i++){
        mended_dict[i] = [list[2*i], list[2*i+1]];
    }
    console.log(mended_dict.length);
    $('#btnSubmit3').on('click', function(){
        document.getElementById("test1").innerHTML='';
        document.getElementById("test2").innerHTML='';
        document.getElementById("test3").innerHTML='';
        document.getElementById("test4").innerHTML='';
        document.getElementById("test5").innerHTML='';
        document.getElementById("test6").innerHTML='';
        let strURL = "https://www.google.com/transliterate?langpair=ja-Hira|ja&text=" + $('#txtZipCode3').val();
        let strURL2 = "https://www.google.com/transliterate?langpair=ja-Hira|ja&text=" + $('#txtZipCode3-2').val();
        $.getJSON(strURL, function(strData){
            console.log(strData);
            document.getElementById("test5").insertAdjacentHTML("beforeend","<div id=test5sson>予測変換は" + strData + "でした</div>");
            let element = document.getElementById("test5sson");
            let text_lists = element.textContent.split(',');
            $.getJSON(strURL2, function(strData2){
                console.log(strData2);
                document.getElementById("test5").insertAdjacentHTML("beforeend","<div id=test5-2sson>予測変換は" + strData2 + "でした</div>");
                let element2 = document.getElementById("test5-2sson");
                let text_list2 = element2.textContent.split(',');
                searchfromDict3(text_lists, text_list2, mended_dict);})
        });    
    });
    
}

function searchfromDict3(lists, lists2, dict){
    let link_lists = [];
    for(let j=0; j<lists.length; j++){
        for(let i=0; i<dict.length; i++){
            if ((dict[i][1].indexOf(lists[j]) !=-1) && dict[i][0].indexOf('材料') ==-1) {
                link_lists.push(dict[i][0]);
            }
        }
    }
    let set_link_lists = Array.from(new Set(link_lists));
    
    let link_lists2 = [];
    for(let j=0; j<lists2.length; j++){
        for(let i=0; i<dict.length; i++){
            if ((dict[i][1].indexOf(lists2[j]) !=-1) && dict[i][0].indexOf('材料') ==-1) {
                link_lists2.push(dict[i][0]);
            }
        }
    }
    let set_link_lists2 = Array.from(new Set(link_lists2));
    
    let common = (set_link_lists.filter(x => set_link_lists2.includes(x)));

   document.getElementById("test6").insertAdjacentHTML("beforeend","<div>検索結果は " + common.length + " 件でした</a></div>");
    for(let k=0; k<common.length; k++){
        document.getElementById("test6").insertAdjacentHTML("beforeend","<div><a href= https://cookpad.com/search/" + common[k] + ">" + common[k] + "</a></div>");}    
    
    if(common.length>20){ 
        $('#btnSubmitnum3').on('click',function(){
            document.getElementById("test6").innerHTML='';
            let rand_link_lists = [];
            while(rand_link_lists.length<20){
                rand_link_lists.push(common[Math.floor( Math.random() * (common.length + 1))]);
                rand_link_lists = Array.from(new Set(rand_link_lists));}
                for(let i=0; i<rand_link_lists.length; i++){
                    if(typeof(rand_link_lists[i]) == 'undefined'){
                        rand_link_lists[i] = 'a';
                    }
                }
                rand_link_lists = rand_link_lists.filter(function(x){return x != 'a'});
                for(let k=0; k<rand_link_lists.length; k++){
                document.getElementById("test6").insertAdjacentHTML("beforeend","<div><a href= https://cookpad.com/search/" + rand_link_lists[k] + ">" + rand_link_lists[k] + "</a></div>");
            }})
    }
}

getCSV3();



/*$('#btnSubmit').on('click', function(){
    var strURL = "https://www.google.com/transliterate?langpair=ja-Hira|ja&text=" + $('#txtZipCode').val();
    $.getJSON(strURL, function(strData){
        console.log(strData);
        document.getElementById("test1").insertAdjacentHTML("beforeend","<div id=test1sson>" + strData + "</div>");
        let element = document.getElementById("test1sson");
        let text_lists = element.textContent.split(',');
        let mended_dict = getCSV();
        searchfromDict(text_lists ,mended_dict);
    });
});document.getElementById("test2").insertAdjacentHTML("beforeend","<div><a href= https://cookpad.com/search/" + dict[i][0] + ">https://cookpad.com/search/" + dict[i][0] + "</a></div>");*/

