class Margin {
	constructor(left, right, top, bottom) {
		this.left = left;
		this.right = right;
		this.top = top;
		this.bottom = bottom;
	}
}

class PlotLayout {
	constructor(width, height, margin) {
		this.totalWidth = width;
		this.totalHeight = height;
		this.plotWidth = width - margin.left - margin.right;
		this.plotHeight = height - margin.top - margin.bottom;
		this.margin = margin;
	}
}
class Strategy {
	constructor(
		resultData,
		climateZone,
		heatingSystem,
		glazingMaterial,
		shadingMaterial,
		shadingControl,
		daylightDimming
	) {
		this.climateZone = climateZone;
		this.heatingSystem = getLabel(heatingSystemRadioOptions, heatingSystem);
		this.glazingMaterial = getLabel(glazingMaterialDropdownOptions, glazingMaterial);
		this.shadingMaterial = getLabel(shadingMaterialDropdownOptions, shadingMaterial);
		this.shadingControl = getLabel(shadingControlDropdownOptions, shadingControl);
		this.daylightDimming = getLabel(daylightDimmingRadioOptions, daylightDimming);
		this.id = `${heatingSystem}_${glazingMaterial}_${shadingMaterial}_${shadingControl}_${daylightDimming}`;

		this.index = strategyIDToIndex.find((e) => e.id === this.id).index;
		// this.color =
		// this.data = getSelectedStrategyData(resultData, climateZone, this.id);
		this.data = resultData[climateZone][this.id];
	}
}

class Color {
	constructor(scale, index) {
		const schemes = {
			color: {
				default: [
					"#4e79a7",
					"#f28e2b",
					"#e15759",
					"#76b7b2",
					"#59a14f",
					"#b07aa1",
					"#df99b2",
					"#9c755f",
					"#bab0ac",
					"#edc948",
				],
				light: [
					"#a0cbe8",
					"#ffbe7d",
					"#ff9d9a",
					"#a8d1ce",
					"#8cd17d",
					"#d4a6c8",
					"#fabfd2",
					"#d7b5a6",
					"#ddd8d6",
					"#f4de8e",
				],
				dark: [
					"#3e6084",
					"#dc740e",
					"#d92c2e",
					"#499894",
					"#467f3e",
					"#9b5c89",
					"#d37295",
					"#7c5d4c",
					"#78706e",
					"#b6992d",
				],
			},
			gray: {
				default: ["gray"],
				light: ["lightgray"],
				dark: ["darkgray"],
			},
		};
		const createColorScale = (colorRange) => {
			return d3.scaleOrdinal().domain(d3.range(10)).range(colorRange);
		};

		const mediumColorScale = createColorScale(schemes[scale].default);

		const lightColorScale = createColorScale(schemes[scale].light);

		const darkColorScale = createColorScale(schemes[scale].dark);

		this.dark = darkColorScale(index);
		this.default = mediumColorScale(index);
		this.light = lightColorScale(index);
	}
}

const heatingSystemRadioOptions = [
	{ id: "gas", label: "Gas Furnace" },
	{ id: "hp", label: "Heat Pump" },
];
const daylightDimmingRadioOptions = [
	{ id: "nodimming", label: "Off" },
	{ id: "dimming", label: "On" },
];
const climateZoneDropdownOptions = [
	{ id: "1A_USA_FL_MIAMI", label: "1A: Very Hot Humid (Miami, Florida)" },
	{ id: "2A_USA_TX_HOUSTON", label: "2A: Hot Humid (Houston, Texas)" },
	{ id: "2B_USA_AZ_PHOENIX", label: "2B: Hot Dry (Phoenix, Arizona)" },
	{ id: "3A_USA_GA_ATLANTA", label: "3A: Warm Humid (Atlanta, Georgia)" },
	{ id: "3B_USA_CA_LOS_ANGELES", label: "3B: Warm Dry (Los Angeles, California)" },
	{ id: "3B_USA_NV_LAS_VEGAS", label: "3B: Warm Dry (Las Vegas, Nevada)" },
	{ id: "3C_USA_CA_SAN_FRANCISCO", label: "3C: Warm Marine (San Francisco, California)" },
	{ id: "4A_USA_MD_BALTIMORE", label: "4A: Mixed Humid (Baltimore, Maryland)" },
	{ id: "4B_USA_NM_ALBUQUERQUE", label: "4B: Mixed Dry (Albuquerque, New Mexico)" },
	{ id: "4C_USA_WA_SEATTLE", label: "4C: Mixed Marine (Seattle, Washington)" },
	{ id: "5A_USA_IL_CHICAGO-OHARE", label: "5A: Cool Humid (Chicago, Illinois)" },
	{ id: "5B_USA_CO_BOULDER", label: "5B: Cool Dry (Boulder, Colorado)" },
	{ id: "6A_USA_MN_MINNEAPOLIS", label: "6A: Cool Humid (Minneapolis, Minnesota)" },
	{ id: "6B_USA_MT_HELENA", label: "6B: Cool Dry (Helena, Montana)" },
	{ id: "7A_USA_MN_DULUTH", label: "7: Very Cool (Duluth, Minnesota)" },
	{ id: "8A_USA_AK_FAIRBANKS", label: "8: Subartic/Arctic (Fairbanks, Alaska)" },
];
const glazingMaterialDropdownOptions = [
	{ id: "sglclr", label: "Single Pane - Clear" },
	{ id: "dblclr", label: "Double Pane - Clear" },
	{ id: "tplclr", label: "Triple Pane - Clear" },
];
const shadingMaterialDropdownOptions = [
	{ id: "noshades", label: "None" },
	{ id: "extshdt3dark", label: "Exterior Shade - tvis 3% Dark" },
	{ id: "intshdt3dark", label: "Interior Shade - tvis 3% Dark" },
];
const shadingControlDropdownOptions = [
	{ id: "noshadectrl", label: "None" },
	{ id: "always60percentshaded", label: "Always 2/3 Shaded" },
	{ id: "dynamicctrl1", label: "Dynamic Controller #1" },
];
const peakLoadDisplayRadioOptions = [
	{ id: "absolute", label: "Absolute" },
	{ id: "relative", label: "Relative (to baseline)" },
];
const glazingMaterials = glazingMaterialDropdownOptions.map((element) => element.id);
const heatingSystems = heatingSystemRadioOptions.map((element) => element.id);
const daylightDimming = daylightDimmingRadioOptions.map((element) => element.id);

const strategyIDToIndex = [];
heatingSystems.forEach((heatingSystem) => {
	glazingMaterials.forEach((glazingMaterial) => {
		daylightDimming.forEach((daylightDimming) => {
			const strategyID = `${heatingSystem}_${glazingMaterial}_noshades_noshadectrl_${daylightDimming}`;
			strategyIDToIndex.push({ id: strategyID, index: strategyIDToIndex.length + 1 });
			["extshdt3dark", "intshdt3dark"].forEach((shadingMaterial) => {
				["always60percentshaded", "dynamicctrl1"].forEach((shadingControl) => {
					const strategyID = `${heatingSystem}_${glazingMaterial}_${shadingMaterial}_${shadingControl}_${daylightDimming}`;
					strategyIDToIndex.push({ id: strategyID, index: strategyIDToIndex.length + 1 });
				});
			});
		});
	});
});
const performanceMetricDescriptions = [
	{
		id: "A",
		label: "5 = more efficient. <br> <br> This category evaluates how effective the HVAC, lighting, facades systems and other applicance operations are. A higher rating indicates lower energy consumption and reduced utility costs.",
	},
	{
		id: "B",
		label: "5 = more flexible. <br> <br> This category evaluates the building's ability to adjust its energy consumption patterns in response to grid signals.A higher rating indicates the building can adapt its energy consumption to help grid stability and take advantage of the off-peak energy rates.",
	},
	{
		id: "C",
		label: "5 = greater HVAC downsizing. <br> <br> This category evaluates the potential to reduce the size of the heating systems without compromising comfort. A higher rating indicates potential for downsizing, resulting in energy savings and lower equipment costs.",
	},
	{
		id: "D",
		label: "5 = greater HVAC downsizing. <br> <br> This category evaluates the potential to reduce the size of the cooling systems without compromising comfort. A higher rating indicates potential for downsizing, resulting in energy savings and lower equipment costs.",
	},
	{
		id: "E",
		label: "5 = more carbon emission reduction. <br> <br> This category evaluates the building's ability to reduce its greenhouse gas emissions. A higher rating indicates alignment with net-zero emissions and climate change mitigation goals.",
	},
	{
		id: "F",
		label: "5 = more comfortable. <br> <br> This category evaluates the occupants' visual comfort. A higher rating indicates occupants are less likely to experience glare, resulting in overall well-being.",
	},
	{
		id: "G",
		label: "5 = more natural daylight is available. <br> <br> This category evaluates how much of the building's illumination is achieved from natural daylight. A higher rating indicates greater availability of natural daylight, resulting in reduced energy consumption.",
	},
];
let tooltip = d3.select("#tooltip");
dataUrl = "Results.json";

genDropdown("climate-zone-dropdown", climateZoneDropdownOptions);
genDropdown("glazing-material-dropdown", glazingMaterialDropdownOptions);
genDropdown("shading-material-dropdown", shadingMaterialDropdownOptions);
genDropdown("shading-control-dropdown", shadingControlDropdownOptions);
genRadio("heating-system-radio", heatingSystemRadioOptions);
genRadio("daylight-dimming-radio", daylightDimmingRadioOptions);
genRadio("peak-load-display-radio", peakLoadDisplayRadioOptions);

d3.select("#defaultPeakLoadTab").dispatch("click");
addInfoIcons();

d3.json(dataUrl).then((resultData) => {
	let climateZone = updateClimateZone(resultData);
	let selectedStrategyLibrary = genStrategyLibrary(resultData, climateZone);
	updateSelectedStrategyTable(selectedStrategyLibrary);
	updateStrategyChart(selectedStrategyLibrary);

	d3.select("#climate-zone-dropdown").on("change", () => {
		climateZone = updateClimateZone(resultData, climateZone);
		selectedStrategyLibrary = genStrategyLibrary(resultData, climateZone);
		updateSelectedStrategyTable(selectedStrategyLibrary);
		updateStrategyChart(selectedStrategyLibrary);
	});

	d3.select("#strategy-add-button").on("click", () => {
		selectedStrategyLibrary = addSelectedStrategyToLibrary(resultData, climateZone, selectedStrategyLibrary);
		updateSelectedStrategyTable(selectedStrategyLibrary);
		updateStrategyChart(selectedStrategyLibrary);
	});
});

function addInfoIcons() {
	createShadingControlInfoIcon("#shading-control-info1");
	createShadingControlInfoIcon("#shading-control-info2");
	createPeakLoadInfoIcon("#peak-load-info");
}

function createShadingControlInfoIcon(id) {
	const alway60 = `<strong>Always two-third shaded</strong><br>The shade is always two-thirds of the way down.`;
	const ctrl1 = `<strong>Dynamic Controller #1</strong><br>The shade can be adjusted to fully open or closed, one-third of the way down, or two-thirds of the way down. The shade controller inputs include sky cloud coverage, thermal load, indoor brightness, and daylight penetration depth. It is optimized to reduce energy consumption and visual comfort.`;
	const content = alway60 + "<br><br>" + ctrl1;

	const svg = d3
		.select(id)
		.append("svg")
		.attr("width", 20)
		.attr("height", 20)
		.style("display", "inline-block")
		.style("vertical-align", "middle")
		.style("margin-left", "5px");

	createInfoIcon(svg, 10, 10, content);
}

function createPeakLoadInfoIcon(id) {
	const absolute = `<strong>Absolute</strong><br>Monthly cooling or heating load peak`;
	const relative = `<strong>Relative</strong><br>Asychronous peak difference when compared to baseline. A negative value means the selected strategy has a lower peak load than the baseline and suggests potential energy savings.`;
	const content = absolute + "<br><br>" + relative;

	const svg = d3
		.select(id)
		.append("svg")
		.attr("width", 20)
		.attr("height", 20)
		.style("display", "inline-block")
		.style("vertical-align", "middle")
		.style("margin-left", "5px");

	createInfoIcon(svg, 10, 10, content);
}

function genRadio(name, options) {
	const radioGroup = d3.select(`#${name}`).append("form").attr("id", `${name}`).attr("class", "radio-group");

	const radioButtons = radioGroup
		.selectAll("label")
		.data(options)
		.enter()
		.append("label")
		.attr("class", "radio-label");
	radioButtons
		.append("input")
		.attr("type", "radio")
		.attr("name", name) // Group name for radio buttons
		.attr("id", (d) => d.id)
		.attr("value", (d) => d.label)
		.property("checked", (d, i) => i === 0); // Set the first radio button as default
	radioButtons.append("span").text((d) => d.label);
}

function genDropdown(name, options) {
	const dropdown = d3.select(`#${name}`).append("select").attr("id", `${name}`).attr("class", "dropdown-button");

	dropdown
		.selectAll("option")
		.data(options)
		.enter()
		.append("option")
		.attr("value", (d) => d.id)
		.text((d) => d.label);

	defaultOption = options[0].id;
	dropdown.property("value", defaultOption);
}

function genStrategyLibrary(resultData, climateZone) {
	setDefaultStrategy();
	const selectedStrategyLibrary = addSelectedStrategyToLibrary(resultData, climateZone, []);
	return selectedStrategyLibrary;
}

function setDefaultStrategy() {
	const defaultOption = [
		{ id: "heatingSystem", label: "gas" },
		{ id: "glazingMaterial", label: "sglclr" },
		{ id: "shadingMaterial", label: "noshades" },
		{ id: "shadingControl", label: "noshadectrl" },
		{ id: "daylightDimming", label: "nodimming" },
	];
	d3.select("#glazing-material-dropdown.dropdown-button").property(
		"value",
		defaultOption.find((d) => d.id === "glazingMaterial").label
	);
	d3.select("#shading-material-dropdown.dropdown-button").property(
		"value",
		defaultOption.find((d) => d.id === "shadingMaterial").label
	);
	d3.select("#shading-control-dropdown.dropdown-button").property(
		"value",
		defaultOption.find((d) => d.id === "shadingControl").label
	);
	d3.selectAll('input[name="heating-system-radio"]').property("checked", function () {
		return this.id === defaultOption.find((o) => o.id === "heatingSystem").label;
	});
	d3.selectAll('input[name="daylight-dimming-radio"]').property("checked", function () {
		return this.id === defaultOption.find((o) => o.id === "daylightDimming").label;
	});
}

function getLabel(options, id) {
	return options.find((d) => d.id === id).label;
}

function camelToCapitalizedCase(str) {
	return str
		.replace(/([a-z0-9])([A-Z])/g, "$1 $2") // Add a space before capital letters
		.replace(/^./, function (str) {
			return str.toUpperCase();
		}); // Capitalize the first letter
}

function updateClimateZone(resultData) {
	// update title
	const climateZone = d3.select("#climate-zone-dropdown select").property("value");

	document.getElementById("climate-energy-bar-title").textContent =
		"Climate Zone " + d3.select("#climate-zone-dropdown").select("option:checked").text();

	const allStrategyLibrary = getAllStrategyLibrary(resultData, climateZone);

	updateAllStrategyTable(allStrategyLibrary);
	updateAllStrategyEnergyBarPlot(allStrategyLibrary);

	console.log("Updated to climate zone", climateZone);
	return climateZone;
}

function getAllStrategyLibrary(resultData, climateZone) {
	return Object.entries(resultData[climateZone]).map(([id]) => {
		const [heatingSystem, glazingMaterial, shadingMaterial, shadingControl, daylightDimming] = id.split("_");

		const strategy = new Strategy(
			resultData,
			climateZone,
			heatingSystem,
			glazingMaterial,
			shadingMaterial,
			shadingControl,
			daylightDimming
		);

		return strategy;
	});
}

function addSelectedStrategyToLibrary(resultData, climateZone, selectedStrategyLibrary) {
	const heatingSystem = d3.select('input[name="heating-system-radio"]:checked').node().id;
	const glazingMaterial = d3.select("#glazing-material-dropdown select").property("value");
	const shadingMaterial = d3.select("#shading-material-dropdown select").property("value");
	const shadingControl = d3.select("#shading-control-dropdown select").property("value");
	const daylightDimming = d3.select('input[name="daylight-dimming-radio"]:checked').node().id;

	const id = `${heatingSystem}_${glazingMaterial}_${shadingMaterial}_${shadingControl}_${daylightDimming}`;
	if (selectedStrategyLibrary.some((strategy) => strategy.id === id)) {
		alert("Strategy is already added to the library.");
		return selectedStrategyLibrary;
	} else if (!Object.keys(resultData[climateZone]).includes(id)) {
		alert(
			"Strategy is not available for this climate zone. If you select a shading material, please select a shading control."
		);
		return selectedStrategyLibrary;
	} else {
		const selectedStrategy = new Strategy(
			resultData,
			climateZone,
			heatingSystem,
			glazingMaterial,
			shadingMaterial,
			shadingControl,
			daylightDimming
		);
		selectedStrategyLibrary.push(selectedStrategy);
		console.log(`Added strategy to library: ${id}`);
		return selectedStrategyLibrary;
	}
}

function updateSelectedStrategyTable(selectedStrategyLibrary) {
	const tbody = d3.select("#strategy-library-table tbody");
	tbody.selectAll("*").remove();
	selectedStrategyLibrary.forEach((d, index) => {
		const row = tbody.append("tr");
		const strategyColor = new Color("color", index).default;
		if (index === 0) {
			row.append("td");
			row.append("td")
				.append("button")
				.text(`#${d.index} (baseline)`)
				.attr("class", "button")
				.style("height", "50%")
				.style("background-color", strategyColor)
				.style("border-color", strategyColor);
		} else {
			row.append("td")
				.append("button")
				.text("X")
				.attr("class", "remove-button")
				.on("click", () => {
					selectedStrategyLibrary.splice(index, 1);
					updateSelectedStrategyTable(selectedStrategyLibrary);
					updateStrategyChart(selectedStrategyLibrary);
				});
			row.append("td")
				.append("button")
				.text(`#${d.index}`)
				.attr("class", "button")
				.style("height", "50%")
				.style("background-color", strategyColor)
				.style("border-color", strategyColor);
		}
		row.append("td").text(d.heatingSystem);
		row.append("td").text(d.glazingMaterial);
		row.append("td").text(d.shadingMaterial);
		row.append("td").text(d.shadingControl);
		row.append("td").text(d.daylightDimming);
	});
}
function updateAllStrategyTable(allStrategyLibrary) {
	allStrategyLibrary.sort((a, b) => a.index - b.index);
	const tbody = d3.select("#strategy-lookup-table tbody");
	tbody.selectAll("*").remove();
	allStrategyLibrary.forEach((strategy) => {
		const row = tbody.append("tr");
		row.append("td").text(strategy.index);
		row.append("td").text(strategy.heatingSystem);
		row.append("td").text(strategy.glazingMaterial);
		row.append("td").text(strategy.shadingMaterial);
		row.append("td").text(strategy.shadingControl);
		row.append("td").text(strategy.daylightDimming);
	});
}

function updateStrategyChart(strategyDataLibrary) {
	updateSelectedStrategyEnergyBarPlot(strategyDataLibrary);
	let displayFormat = d3.select('input[name="peak-load-display-radio"]:checked').node().id;
	updateSelectedStrategyPeakLoadLinePlot(strategyDataLibrary, "heating", displayFormat);
	updateSelectedStrategyPeakLoadLinePlot(strategyDataLibrary, "cooling", displayFormat);
	d3.select("#peak-load-display-radio").on("change", () => {
		displayFormat = d3.select('input[name="peak-load-display-radio"]:checked').node().id;
		updateSelectedStrategyPeakLoadLinePlot(strategyDataLibrary, "heating", displayFormat);
		updateSelectedStrategyPeakLoadLinePlot(strategyDataLibrary, "cooling", displayFormat);
	});
	updatePerformanceRadarPlot(strategyDataLibrary);
}

function selectPeakLoadTab(event, energyType) {
	// Hide all elements with class "tabcontent"
	d3.selectAll(".tabcontent").style("display", "none");

	// Remove the "active" class from all elements with class "tablinks"
	d3.selectAll(".tablinks").classed("active", false);

	// Show the current tab and add an "active" class to the button that opened the tab
	d3.select(`#${energyType}`).style("display", "block");
	d3.select(event.currentTarget).classed("active", true);
}

function createSVGContainer(containerId, plotLayout) {
	d3.select(containerId).selectAll("svg").remove();
	return d3
		.select(containerId)
		.append("svg")
		.attr("width", plotLayout.totalWidth)
		.attr("height", plotLayout.totalHeight)
		.append("g")
		.attr("transform", "translate(" + plotLayout.margin.left + ", " + plotLayout.margin.top + ")");
}

function addAxes(svg, xScale, yScale, plotLayout) {
	const xAxis = d3.axisBottom(xScale).ticks(5).tickPadding(10);
	const yAxis = d3.axisLeft(yScale).ticks(5).tickPadding(10);

	// Add the x-axis
	svg.append("g")
		.attr("class", "axis-label x-axis")
		.attr("transform", `translate(0,${plotLayout.plotHeight})`)
		.call(xAxis);

	// Add the y-axis
	svg.append("g").attr("class", "axis-label y-axis").call(yAxis);

	svg.select(".y").transition().duration(1000).call(yAxis);
	return { xAxis, yAxis };
}

function addYLabel(svg, plotLayout, text) {
	const yLabel = svg
		.append("text")
		.attr("class", "axis-label")
		.attr("transform", "rotate(-90)")
		.attr("x", -plotLayout.plotHeight / 2)
		.attr("y", -plotLayout.margin.left * 0.7)
		.attr("text-anchor", "middle")
		.text(text);
	return yLabel;
}

function addXLabel(svg, plotLayout, text) {
	const xLabel = svg
		.append("text")
		.attr("class", "axis-label")
		.attr("x", plotLayout.plotWidth / 2) // Center the label
		.attr("y", plotLayout.plotHeight + plotLayout.margin.bottom / 2) // Adjust the vertical position
		.attr("text-anchor", "middle")
		.text(text);
	return xLabel;
}

function addLegend(svg, plotLayout, colorScale) {
	const legend = svg
		.append("g")
		.attr("class", "legend")
		.attr("transform", `translate(0, -${plotLayout.margin.top * 0.8})`);

	const legendSize = 20;
	const legendItemPadding = 150;

	// Add legend items
	legend
		.selectAll(".legend-item")
		.data(colorScale.domain())
		.join("g")
		.attr("class", "legend-item")
		.attr("transform", (d, i) => `translate(${i * (legendSize + legendItemPadding)}, 0)`)
		.each(function (d, i) {
			// Add colored rectangle for each legend item
			d3.select(this)
				.append("rect")
				.attr("width", legendSize)
				.attr("height", legendSize)
				.attr("fill", colorScale(d));

			// Add label for each legend item
			d3.select(this)
				.append("text")
				.attr("x", legendSize + 5)
				.attr("y", legendSize / 2)
				.attr("dy", "0.35em")
				.attr("fill", "black")
				.style("font-size", "12px")
				.text(camelToCapitalizedCase(d));
		});
}

function createInfoIcon(parent, x, y, content) {
	const iconGroup = parent.append("g").attr("class", "info-icon-group").attr("transform", `translate(${x}, ${y})`);

	iconGroup
		.append("circle")
		.attr("class", "info-icon")
		.attr("r", 6) // Use attr for radius
		.attr("fill", "#ccc") // Use attr for fill
		.attr("stroke", "none"); // Use attr for stroke

	iconGroup
		.append("text")
		.attr("class", "info-icon-text")
		.attr("text-anchor", "middle")
		.attr("dy", "0.3em")
		.text("?")
		.attr("fill", "white") // Use attr for fill
		.style("font-size", "10px")
		.style("font-weight", "normal")
		.on("mouseover", (event) => {
			tooltip.style("display", "block").html(content);
			updateTooltipPosition(event);
		})
		.on("mousemove", (event) => {
			updateTooltipPosition(event);
		})
		.on("mouseout", () => {
			tooltip.style("display", "none");
		});

	function updateTooltipPosition(event) {
		const tooltipWidth = tooltip.node().offsetWidth; // Get tooltip width
		const tooltipHeight = tooltip.node().offsetHeight; // Get tooltip height
		let left = event.pageX + 5;
		let top = event.pageY - 28;

		// Check if tooltip goes beyond right edge of viewport
		if (left + tooltipWidth > window.innerWidth) {
			left = window.innerWidth - tooltipWidth - 100; // Adjust left position
		}

		// // Check if tooltip goes beyond bottom edge of viewport
		// if (top < 0) {
		// 	top = 5; // Adjust top position to be within the viewport
		// } else if (top + tooltipHeight > window.innerHeight) {
		// 	top = window.innerHeight - tooltipHeight - 10; // Adjust top position for bottom overflow
		// }

		// Update tooltip position
		tooltip.style("left", `${left}px`).style("top", `${top}px`);
	}
}

function updateRectsAllStrategy(className, xscale, yscale, plotLayout, childRects, energyType) {
	const highlightColorScale = d3
		.scaleOrdinal()
		.domain(["lightingEnergy", "heatingEnergy", "coolingEnergy"])
		.range(["#347890", "#4197b4", "#a5d0df"]);

	childRects
		.selectAll("rect")
		.data((d) => d)
		.join(
			(enter) =>
				enter
					.append("rect")
					.attr("class", (d) => `${className}${d.data.index}`)
					.attr("x", xscale(0))
					.attr("y", (d) => yscale(d.data.index))
					.attr("height", yscale.bandwidth())
					.call((enter) =>
						enter
							.transition()
							.duration(1000)
							.attr("x", (d) => xscale(d[0]))
							.attr("width", (d) => xscale(d[1]) - xscale(d[0]))
					)
					.on("mouseover", function (event, d) {
						const parent = d3.select(this.parentNode.parentNode).attr("class");
						highlightColorScale.domain().forEach((energyType) => {
							d3.selectAll(`.${parent}-${energyType}${d.data.index}`).attr(
								"fill",
								highlightColorScale(energyType)
							);
						});
						const name = getStrategyNameText(d.data);
						const lightingEnergy = `<strong>Lighting Energy:</strong> ${Math.round(
							d.data.lightingEnergy
						)} kwh`;
						const heatingEnergy = `<strong>Heating Energy:</strong> ${Math.round(
							d.data.heatingEnergy
						)} kwh`;
						const coolingEnergy = `<strong>Cooling Energy:</strong> ${Math.round(
							d.data.coolingEnergy
						)} kwh`;
						const total = `<strong>Total:</strong> ${Math.round(
							d.data.lightingEnergy + d.data.heatingEnergy + d.data.coolingEnergy
						)} kwh`;

						tooltip
							.style("display", "block")
							.html(
								name +
									"<br> <br>" +
									lightingEnergy +
									"<br>" +
									heatingEnergy +
									"<br>" +
									coolingEnergy +
									"<br>" +
									total
							)
							.style("left", event.pageX + 5 + "px")
							.style("top", event.pageY - 28 + "px");
					})
					.on("mouseout", function (event, d) {
						const parent = d3.select(this.parentNode.parentNode).attr("class");
						highlightColorScale.domain().forEach((energyType) => {
							d3.selectAll(`.${parent}-${energyType}${d.data.index}`).attr("fill", null);
						});
						// d3.selectAll(`.${parent} rect`).attr("opacity", 1);
						tooltip.style("display", "none");
					}),
			(update) =>
				update
					.transition()
					.duration(1000)
					.attr("x", (d) => xscale(d[0]))
					.attr("width", (d) => xscale(d[1]) - xscale(d[0])),
			(exit) => exit.remove()
		);
}

function updateRectsSelectedStrategy(className, xscale, yscale, plotLayout, childRects, xscale1, index, energyType) {
	childRects
		.selectAll("rect")
		.data((d) => d)
		.join(
			(enter) =>
				enter
					.append("rect")
					.attr("class", (d) => `${className}-${d.data.month}`)
					.attr("x", (d) => xscale1(d.data.month) + index * xscale.bandwidth())
					.attr("y", yscale(0))
					.attr("width", xscale.bandwidth())
					.attr("fill", (d) => {
						color = new Color("color", index);
						if (energyType === "lightingEnergy") {
							return color.dark;
						} else if (energyType === "heatingEnergy") {
							return color.default;
						} else if (energyType === "coolingEnergy") {
							return color.light;
						}
					})

					.call((enter) =>
						enter
							.transition()
							.duration(1000)
							.attr("y", (d) => yscale(d[1]))
							.attr("height", (d) => yscale(d[0]) - yscale(d[1]))
					)
					.on("mouseover", function (event, d) {
						const parent = d3.select(this.parentNode.parentNode).attr("class");
						color = new Color("gray", 0);
						d3.selectAll(`.${parent}-lightingEnergy-${d.data.month}`).attr("fill", (d) => color.dark);
						d3.selectAll(`.${parent}-heatingEnergy-${d.data.month}`).attr("fill", (d) => color.default);
						d3.selectAll(`.${parent}-coolingEnergy-${d.data.month}`).attr("fill", (d) => color.light);

						const name = getStrategyNameText(d.data);
						const lightingEnergy = `<strong>Lighting Energy:</strong> ${Math.round(
							d.data.lightingEnergy
						)} kwh`;
						const heatingEnergy = `<strong>Heating Energy:</strong> ${Math.round(
							d.data.heatingEnergy
						)} kwh`;
						const coolingEnergy = `<strong>Cooling Energy:</strong> ${Math.round(
							d.data.coolingEnergy
						)} kwh`;
						const total = `<strong>Total:</strong> ${Math.round(
							d.data.lightingEnergy + d.data.heatingEnergy + d.data.coolingEnergy
						)} kwh`;

						tooltip
							.style("display", "block")
							.html(
								name +
									"<br> <br>" +
									lightingEnergy +
									"<br>" +
									heatingEnergy +
									"<br>" +
									coolingEnergy +
									"<br>" +
									total
							)
							.style("left", event.pageX + 5 + "px")
							.style("top", event.pageY - 28 + "px");
					})
					.on("mouseout", function (event, d) {
						const parent = d3.select(this.parentNode.parentNode).attr("class");
						color = new Color("color", index);
						d3.selectAll(`.${parent}-lightingEnergy-${d.data.month}`).attr("fill", (d) => color.dark);
						d3.selectAll(`.${parent}-heatingEnergy-${d.data.month}`).attr("fill", (d) => color.default);
						d3.selectAll(`.${parent}-coolingEnergy-${d.data.month}`).attr("fill", (d) => color.light);
						tooltip.style("display", "none");
					}),

			(update) =>
				update
					.transition()
					.duration(1000)
					.attr("y", (d) => yscale(d[1]))
					.attr("height", (d) => yscale(d[0]) - yscale(d[1])),
			(exit) => exit.remove()
		);
}

function getStrategyNameText(data) {
	const heatingSystem = `<strong>Heating System:</strong> ${data.heatingSystem}`;
	const glazingMaterial = `<strong>Glazing Material:</strong> ${data.glazingMaterial}`;
	const shadingMaterial = `<strong>Shading Material:</strong> ${data.shadingMaterial}`;
	const shadingControl = `<strong>Shading Control:</strong> ${data.shadingControl}`;
	const daylightDimming = `<strong>Daylight Dimming:</strong> ${data.daylightDimming}`;

	const text =
		heatingSystem +
		"<br>" +
		glazingMaterial +
		"<br>" +
		shadingMaterial +
		"<br>" +
		shadingControl +
		"<br>" +
		daylightDimming;

	return text;
}

function updateSelectedStrategyEnergyBarPlot(strategyDataLibrary) {
	containerId = "#selected-strategy-energy-stacked-bar-plot";
	const margin = new Margin(90, 20, 50, 70);
	const plotLayout = new PlotLayout(850, 300, margin);
	const svg = createSVGContainer(containerId, plotLayout);

	const data = strategyDataLibrary.flatMap((d) => {
		return {
			id: d.id,
			values: d.data.values.months.map((month) => ({
				...d,
				month: month.month,
				lightingEnergy: month.lighting_energy_kwh,
				heatingEnergy: month.heating_energy_kwh,
				coolingEnergy: month.cooling_energy_kwh,
			})),
		};
	});

	// months
	const xscale1 = d3
		.scaleBand()
		.domain(data.flatMap((d) => d.values.map((d) => d.month)))
		.range([0, plotLayout.plotWidth])
		.padding(0.1);
	// grouping
	const xscale = d3
		.scaleBand()
		.domain(data.map((d) => d.id))
		.range([0, xscale1.bandwidth()])
		.padding(0.05);

	const yscale = d3
		.scaleLinear()
		.domain([
			0,
			d3.max(data.flatMap((d) => d.values.map((d) => d.heatingEnergy + d.coolingEnergy + d.lightingEnergy))),
		])
		.nice()
		.range([plotLayout.plotHeight, 0]);

	const axes = addAxes(svg, xscale1, yscale, plotLayout);
	svg.select(".axis-label").call(
		d3.axisBottom(xscale1).tickFormat((d) => {
			date = new Date(`${d} 1, 2000`);
			return d3.timeFormat("%b")(date);
		})
	);

	addYLabel(svg, plotLayout, "Energy (kWh)");

	svg.append("text")
		.attr("class", "axis-label")
		.attr("x", plotLayout.plotWidth / 2) // Center the label
		.attr("y", plotLayout.plotHeight + 70) // Adjust the vertical position
		.attr("text-anchor", "middle")
		.style("font-size", "12pt")
		.style("fill", "gray")
		.style("font-style", "italic")
		.text("**Hover over each bar to see strategy details");

	color = new Color("color", 0);
	const colorScale = d3
		.scaleOrdinal()
		.domain(["lightingEnergy", "heatingEnergy", "coolingEnergy"])
		.range([color.dark, color.default, color.light]);

	addLegend(svg, plotLayout, colorScale);

	data.forEach((d, index) => {
		const stack = d3.stack().keys(["lightingEnergy", "heatingEnergy", "coolingEnergy"]);
		const stackData = stack(d.values);

		const bars = svg
			.selectAll(`.selected-strategy-bars-${d.id}`)
			.data(stackData)
			.join(
				(enter) => {
					const barsEnter = enter.append("g").attr("class", `selected-strategy-bars-${d.id}`);

					barsEnter
						.append("g")
						.attr("class", (j) => `.selected-strategy-bars-${d.id}-${j.key}`)
						.each(function (j) {
							updateRectsSelectedStrategy(
								`selected-strategy-bars-${d.id}-${j.key}`,
								xscale,
								yscale,
								plotLayout,
								d3.select(this),
								xscale1,
								index,
								j.key //energy type
							);
						});

					return barsEnter;
				},
				(update) => update,
				(exit) => exit.remove()
			);
	});
}

function updateAllStrategyEnergyBarPlot(allStrategyLibrary) {
	const containerId = "#all-strategy-energy-stacked-bar-plot";
	const margin = new Margin(60, 20, 100, 100);
	const plotLayout = new PlotLayout(580, 1000, margin);
	const svg = createSVGContainer(containerId, plotLayout);

	const data = allStrategyLibrary.map((d) => {
		return {
			...d,
			lightingEnergy: d.data.values.annual.lighting_energy_kwh,
			heatingEnergy: d.data.values.annual.heating_energy_kwh,
			coolingEnergy: d.data.values.annual.cooling_energy_kwh,
		};
	});

	data.sort(
		(a, b) =>
			a.lightingEnergy +
			a.heatingEnergy +
			a.coolingEnergy -
			(b.lightingEnergy + b.heatingEnergy + b.coolingEnergy)
	);

	svg.append("g").attr("class", "stacks");
	const stack = d3.stack().keys(["lightingEnergy", "heatingEnergy", "coolingEnergy"]);
	const stackData = stack(data);

	const xscale = d3
		.scaleLinear()
		.domain([0, d3.max(stackData[stackData.length - 1], (d) => d[1])])
		.rangeRound([0, plotLayout.plotWidth]);

	const yscale = d3
		.scaleBand()
		.rangeRound([0, plotLayout.plotHeight])
		.domain(data.map((d) => d.index))
		.padding(0.1); //gap between bars

	const axes = addAxes(svg, xscale, yscale, plotLayout);

	const xAxisTop = d3.axisTop(xscale).ticks(5).tickPadding(10);

	// Add the x-axis
	svg.append("g").attr("class", "axis-label x-axis").attr("transform", `translate(0,0)`).call(xAxisTop);

	addXLabel(svg, plotLayout, "Energy (kWh)");
	addYLabel(svg, plotLayout, "Strategy Number");

	svg.append("text")
		.attr("class", "axis-label")
		.attr("x", plotLayout.plotWidth / 2) // Center the label
		.attr("y", plotLayout.plotHeight + 70) // Adjust the vertical position
		.attr("text-anchor", "middle")
		.style("font-size", "12pt")
		.style("fill", "gray")
		.style("font-style", "italic")
		.text("**Hover over each bar to see strategy details");

	const colorScale = d3
		.scaleOrdinal()
		.domain(["lightingEnergy", "heatingEnergy", "coolingEnergy"])
		// .range(["gray", "#4197b4", "#a5d0df"]);
		.range(["gray", "darkgray", "lightgray"]);

	addLegend(svg, plotLayout, colorScale);

	const bars = svg
		.selectAll(".all-strategy-bars")
		.data(stackData)
		.join(
			(enter) => {
				const barsEnter = enter.append("g").attr("class", "all-strategy-bars");

				barsEnter
					.append("g")
					.attr("fill", (d) => colorScale(d.key))
					.attr("class", (d) => `all-strategy-bars-${d.key}`)
					.each(function (d) {
						updateRectsAllStrategy(
							`all-strategy-bars-${d.key}`,
							xscale,
							yscale,
							plotLayout,
							d3.select(this),
							d.key
						);
					});

				return barsEnter;
			},
			(update) => update,
			(exit) => exit.remove()
		);
}

function updatePerformanceRadarPlot(strategyDataLibrary) {
	const containerId = "#performance-radar-plot";
	const margin = new Margin(130, 0, 100, 80);
	const plotLayout = new PlotLayout(250, 350, margin);
	const svg = createSVGContainer(containerId, plotLayout);

	const radius = Math.min(plotLayout.plotWidth, plotLayout.plotHeight) / 2;

	const categories = 7;
	const levels = 5;
	const angleSlice = (Math.PI * 2) / categories;
	// Create the radar axis
	const rScale = d3.scaleLinear().range([0, radius]).domain([-1, levels]);

	const ringLabels = [0, 1, 2, 3, 4, 5];
	const rings = svg
		.selectAll(".grid-circle-group")
		.data(ringLabels)
		.enter()
		.append("g")
		.attr("class", "grid-circle-group");

	rings
		.append("circle")
		.attr("class", "grid-circle")
		.attr("r", (d) => rScale(d))
		.style("fill", "none")
		.style("stroke", "#ccc");

	rings
		.append("text")
		.attr("class", "ring-label")
		.attr("x", 5) // Slight offset to the right
		.attr("y", (d) => -rScale(d))
		.text((d) => d)
		.style("font-size", "10px")
		.style("alignment-baseline", "middle");

	strategyDataLibrary.forEach((strategy, index) => {
		const color = new Color("color", index).default;
		const radarLine = d3
			.lineRadial()
			.radius((d) => rScale(d.value / 20))
			.angle((d, i) => i * angleSlice)
			.curve(d3.curveLinearClosed);

		// Draw the radar chart areas
		svg.append("path")
			.datum(strategy.data.metrics)
			.attr("class", "radar-area")
			.attr("d", radarLine)
			.style("fill", color)
			.style("fill-opacity", 0.2)
			.style("stroke", color)
			.style("stroke-width", 2);
	});

	const axisGrid = svg.selectAll(".axis").data(d3.range(categories)).enter().append("g").attr("class", "axis");

	axisGrid
		.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", (d, i) => rScale(levels) * Math.cos(angleSlice * i - Math.PI / 2))
		.attr("y2", (d, i) => rScale(levels) * Math.sin(angleSlice * i - Math.PI / 2))
		.style("stroke", "lightgray")
		.style("stroke-width", "1px");

	const legend = strategyDataLibrary[0].data.metrics.map((d, index) => {
		const letter = String.fromCharCode(65 + index); // 65 is the ASCII code for 'A'
		return { letter: letter, name: d.name.match(/[A-Z][a-z]*/g).join("\n") }; // Create the object with letter and name
	});
	axisGrid
		.append("text")
		.attr("class", "axis-label")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", (d, i) => rScale(levels + 1) * Math.cos(angleSlice * i - Math.PI / 2))
		.attr("y", (d, i) => rScale(levels + 1) * Math.sin(angleSlice * i - Math.PI / 2))
		.text((d, i) => legend[i].letter);

	// Add legend with icons
	const legendGroup = svg
		.append("g")
		.attr("class", "legend")
		.attr("transform", `translate(${-plotLayout.plotWidth},${plotLayout.plotHeight - 50})`);

	const legendItems = legendGroup
		.selectAll(".legend-item")
		.data(legend)
		.enter()
		.append("g")
		.attr("class", "legend-item")
		.attr("transform", (d, i) => `translate(0, ${i * 20})`);

	legendItems
		.append("text")
		.attr("x", 0)
		.text((d) => `${d.letter}: ${d.name}`);

	// 	iconGroup
	legendItems.each(function (d) {
		const textWidth = d3.select(this).select("text").node().getComputedTextLength();
		const content = `${d.letter}: ${d.name} <br> <br> ${
			performanceMetricDescriptions.find((descriptions) => descriptions.id === d.letter).label
		}`;
		createInfoIcon(d3.select(this), textWidth + 10, -6, content);
	});
}

function updateSelectedStrategyPeakLoadLinePlot(strategyDataLibrary, energyType, displayFormat) {
	const containerId = `#selected-strategy-peak-${energyType}-load-line-plot`;
	const margin = new Margin(80, 30, 20, 60);
	const plotLayout = new PlotLayout(540, 250, margin);
	const svg = createSVGContainer(containerId, plotLayout);

	const parseMonth = d3.timeParse("%B");

	let data = strategyDataLibrary.flatMap((d) => {
		return {
			id: d.id,
			values: d.data.values.months.map((month) => ({
				...d,
				month: parseMonth(month.month),
				heatingEnergy: month.heating_load_kw,
				coolingEnergy: month.cooling_load_kw,
			})),
		};
	});
	if (displayFormat === "relative") {
		const baseline = strategyDataLibrary[0];
		data = strategyDataLibrary.flatMap((d) => {
			return {
				id: d.id,
				values: d.data.values.months.map((month) => {
					const baselineMonth = baseline.data.values.months.find((m) => m.month === month.month);
					return {
						...d,
						month: parseMonth(month.month),
						heatingEnergy: month.heating_load_kw - baselineMonth.heating_load_kw,
						coolingEnergy: month.cooling_load_kw - baselineMonth.cooling_load_kw,
					};
				}),
			};
		});
	}

	console.log("here", data);
	const xscale = d3
		.scaleTime()
		.domain(d3.extent(data.flatMap((d) => d.values.map((d) => d.month))))
		.range([0, plotLayout.plotWidth]);

	const yscale = d3
		.scaleLinear()
		.domain(d3.extent(data.flatMap((d) => d.values.map((d) => d[`${energyType}Energy`]))))
		.nice()
		.range([plotLayout.plotHeight, 0]);

	const axes = addAxes(svg, xscale, yscale, plotLayout);
	svg.select(".axis-label").call(d3.axisBottom(xscale).tickFormat(d3.timeFormat("%b")));

	svg.append("text")
		.attr("class", "axis-label")
		.attr("x", plotLayout.plotWidth / 2) // Center the label
		.attr("y", plotLayout.plotHeight + 55) // Adjust the vertical position
		.attr("text-anchor", "middle")
		.text("**Hover over each line to see details")
		.style("font-size", "12pt")
		.style("fill", "gray")
		.style("font-style", "italic");

	// Create line generators
	const line = d3
		.line()
		.x((d) => xscale(d.month))
		.y((d) => yscale(d[`${energyType}Energy`]));

	data.forEach((strategy, index) => {
		color = new Color("color", index);

		// Draw the line
		svg.append("path")
			.datum(strategy.values)
			.attr("class", `line-${index}`)
			.attr("stroke", color.default)
			.attr("d", line)
			.attr("fill", "none")
			.attr("stroke-width", 3)
			.on("mouseover", function (event, d) {
				d3.selectAll(`.line-${index}`).attr("opacity", 0.5);
				const name = getStrategyNameText(d[0]);
				tooltip
					.style("display", "block")
					.html(name + "<br> <br> <i>** hover over a point to see values</i>")
					.style("left", event.pageX + 5 + "px")
					.style("top", event.pageY - 28 + "px");
			})
			.on("mouseout", function (event, d) {
				d3.selectAll(`.line-${index}`).attr("opacity", 1);
				tooltip.style("display", "none");
			});

		// Draw the points
		svg.selectAll(`.${energyType}-point-${index}`)
			.data(strategy.values)
			.enter()
			.append("circle")
			.attr("class", `${energyType}-point-${index}`)
			.attr("cx", (d) => xscale(d.month))
			.attr("cy", (d) => yscale(d[`${energyType}Energy`]))
			.attr("r", 5)
			.attr("fill", color.dark)
			.on("mouseover", function (event, d) {
				d3.selectAll(`.line-${index}`).attr("opacity", 0.5);
				const name = getStrategyNameText(d);
				const energy = `<strong>${camelToCapitalizedCase(energyType)} Energy:</strong> ${d[
					`${energyType}Energy`
				].toFixed(2)} kw`;

				tooltip
					.style("display", "block")
					.html(name + "<br> <br>" + energy)
					.style("left", event.pageX + 5 + "px")
					.style("top", event.pageY - 28 + "px");
			})
			.on("mouseout", function (event, d) {
				d3.selectAll(`.line-${index}`).attr("opacity", 1);
				tooltip.style("display", "none");
			});
	});

	addYLabel(svg, plotLayout, "Peak Load (kW)");
}
