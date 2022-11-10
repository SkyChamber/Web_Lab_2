<%@ page import="com.lab.util.Model" %>
<%@ page import="com.lab.util.Point" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.time.format.DateTimeFormatter" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Lab 2</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/style.css">
</head>

<body>

<div id="maincontent">

    <%-- Header --%>

    <div id="header">
        <h2>Mustafin Rodion Andreevich</h2>
        <h4>P32301</h4>
        <h4>Lab 1 - Web 321345</h4>
    </div>

    <%-- Sidebar --%>

    <div id="sidebar">
        <div id="sidebar_content">
            <img src="static/img/areas.png" alt="plot">
        </div>
    </div>

    <div id="new_sidebar">
        <div id="new_sidebar_content">
            <canvas id="big_canvas" width="300px" height="300px"></canvas>
        </div>
    </div>

    <%-- Form --%>

    <div id="place_for_form">

        <form action="controller" method="get">

            <div class="form_wrapper">

                <%-- x coordinate --%>
                <div id="form_left" class="form_block">
                    <p>Enter X value</p>

                    <input name="x_value" id="x_value" type="hidden"/>

                    <button onclick="setX(-5);validateX();validateY();validateR()" type="button" id="x_button_-5">-5</button>
                    <button onclick="setX(-4);validateX();validateY();validateR()" type="button" id="x_button_-4">-4</button>
                    <button onclick="setX(-3);validateX();validateY();validateR()" type="button" id="x_button_-3">-3</button>
                    <button onclick="setX(-2);validateX();validateY();validateR()" type="button" id="x_button_-2">-2</button>
                    <button onclick="setX(-1);validateX();validateY();validateR()" type="button" id="x_button_-1">-1</button>
                    <button onclick="setX(0);validateX();validateY();validateR()" type="button" id="x_button_0">0</button>
                    <button onclick="setX(1);validateX();validateY();validateR()" type="button" id="x_button_1">1</button>
                    <button onclick="setX(2);validateX();validateY();validateR()" type="button" id="x_button_2">2</button>
                    <button onclick="setX(3);validateX();validateY();validateR()" type="button" id="x_button_3">3</button>

                </div>


                <%-- y coordinate --%>
                <div id="form_center" class="form_block">
                    <p>Enter Y value</p>

                    <label for='y_value'></label>
                    <input type='text' name='y_value' id='y_value' placeholder="0" maxlength="12" required />
                    <div id="y_message"></div>

                </div>

                <%-- radius --%>
                <div id="form_right" class="form_block">
                    <p>Enter R value</p>

                    <label for='r_value'></label>
                    <input type='text' name='r_value' id='r_value' placeholder="0" maxlength="12" required />
                    <div id="r_message"></div>


                <div class="line_breaker"></div>



            </div>

            <%-- Submit button --%>
            <input id="true_submit_button" type="submit" name="btnSubmit" value="Send" />

        </form>
    </div>

<%-- table --%>

    <div id="table_div">
        <table>
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Attempt time</th>
                <th>Processing time</th>
                <th>Result</th>
            </tr>
            </thead>
            <tbody>
                <%
                    String userID = request.getSession(true).getId();
                    ServletContext sc = request.getServletContext();
                    Object supposedToBeModel = sc.getAttribute("values_" + userID);
                    Model model;
                    if (supposedToBeModel == null){
                        model = new Model();
                    } else {
                        model = (Model) supposedToBeModel;
                    }
                    ArrayList<Point> values = model.get();
                    for (int i = values.size() - 1; i >= 0; i--) {
                        Point point = values.get(i);
                        out.println("<tr>");
                        out.print("<td>" + String.valueOf(point.getX()) + "</td>");
                        out.print("<td>" + String.valueOf(point.getY()) + "</td>");
                        out.print("<td>" + String.valueOf(point.getR()) + "</td>");
                        out.print("<td>" + point.getTimeStamp().format(
                                DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss")
                        ) + "</td>");
                        out.print("<td>" + String.valueOf(point.getWorkingTime()) + "</td>");
                        String result = point.getStatus() ? "HIT": "MISS";
                        out.print("<td>" + result + "</td>");
                        out.println("</tr>");
                        out.println();
                    }
                %>
            </tbody>
        </table>
    </div>

</div>

<%
    out.println("<script>");
    out.println("var items = [");
    for (int i = values.size() - 1; i >= 0; i--) {
        Point point = values.get(i);
        out.print("[");
        out.print(point.getX());
        out.print(",");
        out.print(point.getY());
        out.print(",");
        out.print(point.getR());
        out.println("],");
    }
    out.println("];");
    out.println("</script>");
%>

<script src="${pageContext.request.contextPath}/static/js/script.js"></script>

</body>

</html>