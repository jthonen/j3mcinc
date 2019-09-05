import React from "react";

export default function ProgramsDropdownMenu () {
    return (
        <div id="ProgramsDropdownMenu" className="DropdownMenu">
            <span id="AdultTennisMenu" className="DropdownMenuSection">
                <a className="DropdownMenuLink" href="/AdultTennis">
                    <h2 id="AdultTennisDropdownHeader" className="DropdownMenuSectionHeader"> Adult Tennis </h2>
                </a>
                <a className="DropdownMenuLink" href="/AdultTennis/AdultClinics">
                    <h5 id="AdultClinicsDropdownLink" className="DropdownLink"> Adult Clinics </h5>
                </a>
                <a className="DropdownMenuLink" href="/AdultTennis/WeeklyDropInClasses">
                    <h5 id="WeeklyDropInClassesDropdownLink" className="DropdownLink"> Weekly Drop In Classes </h5>
                </a>
                <a className="DropdownMenuLink" href="/AdultTennis/AdultUSTATeams">
                    <h5 id="AdultUSTATeamsDropdownLink" className="DropdownLink"> Adult USTA Teams </h5>
                </a>
                <a className="DropdownMenuLink" href="/PrivateLessons">
                    <h2 id="PrivateLessonsDropdownHeader" className="DropdownMenuSectionHeader"> Private Lessons </h2>
                    <h5 id="SchedulePrivateLesson" className="DropdownLink"> Schedule Private Lesson </h5>
                </a>
            </span>
            <span id="JuniorTennisMenu" className="DropdownMenuSection">
                <a className="DropdownMenuLink" href="/JuniorTennis">
                    <h2 id="JuniorTennisDropdownHeader" className="DropdownMenuSectionHeader"> Junior Tennis </h2>
                </a>
                <a className="DropdownMenuLink" href="/JuniorTennis/JuniorClinics">
                    <h5 id="JuniorClinicsDropdownLink" className="DropdownLink"> Junior Clinics </h5>
                </a>
                <a className="DropdownMenuLink" href="/JuniorTennis/AcademyClinics">
                    <h5 id="AcademyClinicsDropdownLink" className="DropdownLink"> Academy Clinics </h5>
                </a>
                <a className="DropdownMenuLink" href="/JuniorTennis/JuniorTournamentProgram">
                    <h5 id="JuniorTournamentProgramDropdownLink" className="DropdownLink">
                        Junior Tournament Program
                    </h5>
                </a>
                <a className="DropdownMenuLink" href="/JuniorTennis/SummerProgram">
                    <h5 id="SummerProgramDropdownLink" className="DropdownLink"> Summer Program </h5>
                </a>
                <a className="DropdownMenuLink" href="/JuniorTennis/JuniorUSTATeams">
                    <h5 id="JuniorUSTATeamsDropdownLink" className="DropdownLink"> Junior USTA Teams </h5>
                </a>
            </span>
            <span id="ProgramsImages" className="DropdownMenuSection">
                <img className="DropdownMenuImage" src="https://s3-us-west-1.amazonaws.com/ncrc/images/programsImage1.jpg" alt="kids learning tennis"/>
            </span>
        </div>
    );
}
