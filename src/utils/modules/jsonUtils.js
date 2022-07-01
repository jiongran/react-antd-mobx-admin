
import JSONbig from 'json-bigint'
class JsonUtils {
	parse(json) {
		return JSONbig.parse(json)
	}

	stringify(obj) {
		return JSONbig.stringify(obj)
	}
}
const self = new JsonUtils()
export default self
