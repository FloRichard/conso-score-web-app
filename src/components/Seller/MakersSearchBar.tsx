import React from "react";
import { Maker } from "./MakerModel";

type MakersSearchBarProps = {
    makers: Maker[]
    searchInputHandler: (filteredMakers: Maker[]) => void
}

export class MakersSearchBar extends React.Component<MakersSearchBarProps, {}> {
    filterMakers = (e: React.ChangeEvent<HTMLInputElement>) => {
        const makerName = e.target.value.toLowerCase()
        const filteredMakers = this.props.makers.filter(
            maker => maker.name.toLowerCase().includes(makerName)
        )
        this.props.searchInputHandler(filteredMakers)
    }

    render() {
        return (
            <div className="input-group rounded">
                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={this.filterMakers} />
                <span className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search"></i>
                </span>
            </div>
        )
    }
}