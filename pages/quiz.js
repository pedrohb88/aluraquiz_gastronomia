import styled from "styled-components";
import db from "../db.json";
import QuizBackground from "../src/components/QuizBackground";

export default function Quiz() {
    return (
        <QuizBackground backgroundImage={db.bg}>
            <h1>Quiz!</h1>
        </QuizBackground>
    );
}