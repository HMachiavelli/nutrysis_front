import React, { Component } from "react";

import { NavLink } from "react-router-dom";

export class Card extends Component {
  render() {
    return (
      <div className={"card" + (this.props.plain ? " card-plain" : "")}>
        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
          <div className="pull-left col-10">
            <h4 className="title">{this.props.title}</h4>
            <p className="category">{this.props.category}</p>
          </div>

          {
            this.props.addBtn &&
            <NavLink to={this.props.addBtnLink} className="btn btn-success col-2 pull-right">+ Adicionar</NavLink>
          }
        </div>
        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
