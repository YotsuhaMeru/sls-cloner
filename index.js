const fetch = require("node-fetch");

async function slsverget() {
	const html = await fetch("https://sls-tech.jp/allnet/ver_list.html");
	const html2 = await html.text();
	let cut = html2.substr(0, html2.indexOf("<footer>"));
	cut = cut.substr(cut.indexOf("<!--{/each}-->") + 1);
	
	const tarray = new Array();

	let mai2 = cut.substr(cut.indexOf("maimaiでらっくす"));
	tarray.push(mai2);

	let ong = cut.substr(cut.indexOf("オンゲキ"));
	tarray.push(ong);
	
	let chu = cut.substr(cut.indexOf("CHUNITHM"));
	tarray.push(chu);
	
	let desc = "";
	
	for (const title of tarray) {
		if (!desc == "") desc = desc + "\n";
		let info = await title.substr(0, title.indexOf("</section>"));
		info = await info.replace(new RegExp("</h4>", "g"), "");
		info = await info.replace(new RegExp("<br/>", "g"), "");
		info = await info.split("\r\n");
		desc = desc + "**" + info[0] + "** " + info[1] + "\n" + info[2] + "\n" + info[3] + "\n";
	};
	
	console.log(desc)
	
}

async function slsupdget() {
	const html = await fetch("https://sls-tech.jp/allnet/update.html")
	const html2 = await html.text()
	let cut = html2.substr(0, html2.indexOf("<p>※時間は24時間表記</p>"))
	cut = cut.substr(cut.indexOf("<div class=\"ym-wrapper\">") + 1)
	cut = cut.substr(cut.indexOf("<div class=\"ym-wrapper\">") + 1)
	cut = cut.substr(cut.indexOf("<div>"))
	
	cut = cut.replace(new RegExp("<div>", "g"), "")
	cut = cut.replace(new RegExp("</div>", "g"), "")
	cut = cut.replace(new RegExp("<section class=\"box info\">", "g"), "")
	cut = cut.replace(new RegExp("</section>", "g"), "")
	cut = cut.replace(new RegExp("\\r\\n", "g"), "")
	cut = cut.replace(new RegExp("<br/>", "g"), "\n")

	cut = cut.split(".</a>")
	let desc = "";
	await cut.shift()
	cut.forEach(data => {
		if (!desc == "") desc = desc + "\n";
		const c1 = data.split("\n")
		desc = desc + "**" + c1[0] + "**" + "\n" + c1[1] + "\n" + c1[2] + "\n"
	})
	console.log(desc)

}

slsverget()

slsupdget()