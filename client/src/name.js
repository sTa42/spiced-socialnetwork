export function Name(props) {
    const { firstName, lastName = "Anon" } = props;
    return (
        <h3>
            <strong>{firstName}</strong>

            <em>{lastName}</em>
        </h3>
    );
}
