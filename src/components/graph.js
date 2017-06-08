import React from "react"
import { connect } from "react-redux"
import * as d3 from "d3"

/* Helpers */
import convertTime from "./helpers/convertTime"


class Graph extends React.Component {

    componentDidMount() {
        var width = 700
        var height = 500

        var margin = 70

        /* Svg */
        var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height)


        /*** X ***/
        /* X domain */
        var xDomain = [convertTime(this.props.data[this.props.data.length - 1].Time)  -  convertTime(this.props.data[0].Time) + 30, 0]

        /* X scale */
        var xScale = d3.scaleLinear()
            .domain(xDomain)
            .range([margin, width - margin * 2])

        /* X axis */
        var xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(5)
            .tickFormat((seconds) => {
                return ((seconds - (seconds % 60)) / 60).toString() + ":" + (seconds % 60).toString()
            })


        /*** Y ***/
        /* Y domain */
        var yDomain = [1, this.props.data.length]

        /* Y scale */
        var yScale = d3.scaleLinear()
            .domain(yDomain)
            .range([margin, height - margin])

        /* Y axis */
        var yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(10)



        /* Groups */
        /* Name */
        svg.append("g")
            .selectAll("text")
            .data(this.props.data)
            .enter()
            .append("text")
                .attr("x", (d) => xScale(convertTime(d.Time) - convertTime(this.props.data[0].Time) - 3))
                .attr("y", (d) => yScale(d.Place) + 5)
                .text((d) => d.Name)


        /* xAxis */
        svg.append("g")
            .call(xAxis)
            .attr("transform", "translate(0, " + (height - margin + 20) +")")

        /* yAxis */
        svg.append("g")
            .call(yAxis)
            .attr("transform", "translate(" + margin + ", 0)")

        /* Data */
        svg.append("g")
            .selectAll("circle")
            .data(this.props.data)
            .enter()
            .append("circle")
                .attr("cx", (d) => xScale(convertTime(d.Time) - convertTime(this.props.data[0].Time)))
                .attr("cy", (d) => yScale(d.Place) + 1)
                .attr("r", 4)
                .attr("fill", (d) => d.Doping === "" ? "#4068d1" : "#d13232")
                .on("mouseover", (d) => {
                    d3.select(d3.event.currentTarget).attr("stroke", "black")
                    d3.select(".info")
                        .style("opacity", 1)
                        .html(
                            "<p>" + d.Name + ": " + d.Nationality + "</p>" +
                            "<p>Year: " + d.Year +", Time: " + d.Time +"</p>" +
                            (d.Doping !== "" ? "<p>" + d.Doping +"</p>" : "")
                        )
                })
                .on("mouseout", () => {
                    d3.select(".info")
                        .style("opacity", 0)
                    d3.select(d3.event.currentTarget).attr("stroke", "none")

                })


        /* Info of cyclist */
        d3.select("body")
            .append("div")
            .attr("class", "info")
            .style("opacity", 0)
            .html("hello")

        /* Descriptions */
        /* Ranking */
        svg.append("text")
            .style("font-size", 14)
            .attr("transform", "translate(30, " + (height /2) + "), rotate(270)")
            .text("Ranking")

        /* Time */
        svg.append("text")
            .style("font-size", 14)
            .attr("transform", "translate(" + (width/2 - margin * 2) + ", " + (height - 10) + ")")
            .text("Minutes Behind Fastest Time")

        /* Color explanation */
        svg.append("text")
            .attr("transform", "translate(" + (width - margin * 2 - 10) + ", " + (height - margin * 2) + ")")
            .text("Riders with doping allegations")

        svg.append("text")
            .attr("transform", "translate(" + (width - margin * 2 - 10) + ", " + (height - margin * 2 - 20) + ")")
            .text("No doping allegations")

        svg.append("circle")
            .attr("cx", width - margin * 2 - 20)
            .attr("cy", height - margin * 2 - 23)
            .attr("r", 4)
            .attr("fill", "#4068d1")

        svg.append("circle")
            .attr("cx", width - margin * 2 - 20)
            .attr("cy", height - margin * 2 - 3)
            .attr("r", 4)
            .attr("fill", "#d13232")

        /* Description */
        svg.append("text")
            .style("font-size", 16)
            .attr("transform", "translate(10, 20)")
            .text("Doping in Professional Bicycle Racing")
        svg.append("text")
            .style("font-size", 14)
            .attr("transform", "translate(10, 40)")
            .text("35 Fastest times up Alpe d'Huez")


    }


    render() {
        return(
            <div>
                <div className="container">
                    <svg></svg>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Graph)
