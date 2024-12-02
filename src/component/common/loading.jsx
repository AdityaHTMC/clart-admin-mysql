import { Spinner } from "reactstrap"

export const LoadingComponent = () => {
    return (
        <div className="d-grid my-4" style={{ placeItems: 'center' }}>
            <Spinner color="primary">
                Loading...
            </Spinner>
        </div>
    )
}